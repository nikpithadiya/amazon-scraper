
export type ProductType = {
  title : string,
  link : string,
  specifications : {[key : string] : string}
  asin: string,
  imgUrl : string,
}

export const fetchProducts = async (query: string) => {
  const res = await fetch(`/api/amazon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ searchQuery: query }),
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json() as Promise<{products : ProductType[]}>;
};
