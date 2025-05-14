
import { NextRequest, NextResponse } from "next/server";
import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

type ProductLink = {
  title?: string;
  link?: string;
};

type ProductData = ProductLink & {
  specifications: Record<string, string>;
  asin: string | null;
  imgUrl: string | null
};

type ExtendedElement = Element & { href?: string }

const createPage = async ({ browser }: { browser: Browser }) => {
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.5993.90 Safari/537.36"
  );

  // Intercepting requests to block unneeded resources
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    try {
      const url = req.url();
      const blockedResourceTypes = [
        "image",
        "stylesheet",
        "font",
        "media",
        "ping",
      ];
      const blockedDomains = [
        "amazon-adsystem.com",
        "media-amazon.com/images",
        "fls-na.amazon.com",
        "googleads.g.doubleclick.net",
        "s0.2mdn.net",
        "doubleclick.net",
        "/ads/",
        "/sponsored/",
        "/videos/",
        "/images/",
      ];

      const shouldBlock =
        blockedResourceTypes.includes(req.resourceType()) ||
        blockedDomains.some((domain) => url.includes(domain));

      if (shouldBlock) {
        req.abort();
      } else {
        req.continue();
      }
    } catch (e) {
      console.error("Error during request interception:", e);
      req.continue();
    }
  });

  await page.setViewport({ width: 800, height: 600 });
  return page;
};

const launchBrowser = async () => {
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  return browser;
};

const fetchProducts = async (
  e: ProductLink,
  browser: Browser,
): Promise<ProductData | undefined> => {

  if (!e.link) return;
  const page = await createPage({ browser });

  await page.goto(e.link, {
    waitUntil: "domcontentloaded",
  });


  const imgUrl = await page.$eval("#imgTagWrapperId img", (img: HTMLImageElement) => {
    return img.getAttribute("src") || img.getAttribute("data-old-hires");
  });

  const specs = await page.$$eval(
    ".a-section.a-spacing-small.a-spacing-top-small table tr",
    (rows) => {
      const extracted: Record<string, string> = {};
      rows.forEach((row) => {
        const key = row.querySelector("td.a-span3 span")?.textContent?.trim();
        const value = row.querySelector("td.a-span9 span")?.textContent?.trim();
        if (key && value) {
          extracted[key] = value;
        }
      });
      return extracted;
    }
  );

  // Extract feature bullets (key features)
  // const keyFeatures = await page.$$eval(
  //   '#feature-bullets ul.a-unordered-list.a-vertical.a-spacing-mini li span.a-list-item',
  //   (items) =>
  //        items.map((el) => el.textContent.trim()).filter((item) => item.length > 0)
  // );

  const asin =
    e?.link?.match(/(?:\/dp\/|\/gp\/product\/)([A-Z0-9]{10})/)?.[1] ?? null;

  await page.close();
  return { ...e, specifications: specs, asin, imgUrl };
};

const fetchProductLinks = async (
  browser: Browser,
  searchQuery: string
): Promise<ProductLink[]> => {
  const page = await createPage({ browser });

  const pageUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
    searchQuery
  )}`;

  await page.goto(pageUrl, {
    waitUntil: "domcontentloaded",
  });

  try {
    await page.waitForSelector(
      ".a-link-normal.s-line-clamp-2.s-link-style.a-text-normal",
      { timeout: 5000 }
    );
  } catch (error) {
    console.error("Selector not found:", error);
    await page.close();
    return [];
  }

  const productLinks = await page.$$eval(
    ".a-link-normal.s-line-clamp-2.s-link-style.a-text-normal",
    (elements: ExtendedElement[]) =>
      elements
        .map((el) => {
          return {
            title: el.textContent?.trim(),
            link: el.href
          };
        })
        .filter((e) => e?.link && !e?.link?.includes("sspa/click?"))
  );

  await page.close();
  return productLinks;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { searchQuery } = body;

    if (!searchQuery) {
      return NextResponse.json(
        { message: "Search query is required" },
        { status: 400 }
      );
    }

    const browser = await launchBrowser();

    try {
      const links = await fetchProductLinks(browser, searchQuery);

      if (links.length === 0) {
        await browser.close();
        return NextResponse.json(
          { message: "No products found" },
          { status: 400 }
        );
      }

      const scrapedData = await Promise.all(
        links.slice(0, 1).map((e) => fetchProducts(e, browser)).filter(e => !!e)
      );

      await browser.close();
      return NextResponse.json({ products: scrapedData }, { status: 200 });
    } catch (err) {
      console.error("Error during scraping:", err);
      await browser.close();
      return NextResponse.json(
        { message: "Error during scraping", error: err },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
