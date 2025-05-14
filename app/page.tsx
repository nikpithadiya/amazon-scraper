"use client";

import Input from "@/components/input";
import { fetchProducts } from "@/lib/api";
import type { ProductType } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const scrape = async (searchText: string) => {
    const result = await fetchProducts(searchText);
    if (result?.products) {
      setProducts(result?.products);
    }
  };
  // const products = [
  //   {
  //     title:
  //       "2024 MacBook Pro Laptop with M4 Pro, 12-core CPU, 16-core GPU: Built for Apple Intelligence, 14.2-inch Liquid Retina XDR Display, 24GB Unified Memory, 512GB SSD Storage; Space Black",
  //     link: "https://www.amazon.com/Apple-MacBook-Laptop-12-core-16-core/dp/B0DLHY2BJ6/ref=sr_1_3?dib=eyJ2IjoiMSJ9.SiTN0uy0qE9ctdc3d0GhSJpvv4VSK4lXKaD4yJGcqhLMZk4dlSf6bYQ4KSdqKdJlTRpzvUhn4WhcT8QHWRK03JXo-cYWZEApI3XZUNsEN0qbwU5F_hjP-3GLdU7G_1qfecL6xQUHsr901jtj0qWVWnSXJDX5SXgmWy_FAljk5v_4Vm5x-p6fHRMNAFwr_BgL3aD_tYd6T4lWun6AOV_CAaHB7jMR-tifVelU4egD628.27CA8Ah1SDU6KpurcUpWukIVLu5meMIZWtBoJvhF3vs&dib_tag=se&keywords=macbook+pro&qid=1747133379&sr=8-3",
  //     specifications: {
  //       Brand: "Apple",
  //       "Model Name": "MacBook Pro",
  //       "Screen Size": "14.2 Inches",
  //       Color: "Space Black",
  //       "Hard Disk Size": "512 GB",
  //       "CPU Model": "Apple M4",
  //       "Ram Memory Installed Size": "24 GB",
  //       "Operating System": "Mac OS",
  //       "Special Feature": "Fingerprint Reader, Backlit Keyboard",
  //       "Graphics Card Description": "Integrated",
  //     },
  //     asin: "B0DLHY2BJ6",
  //     imgUrl:
  //       "https://m.media-amazon.com/images/I/61-oTP1X4rL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
  //   },
  //   {
  //     title:
  //       "2024 MacBook Pro Laptop with M4 Pro, 12-core CPU, 16-core GPU: Built for Apple Intelligence, 14.2-inch Liquid Retina XDR Display, 24GB Unified Memory, 512GB SSD Storage; Space Black",
  //     link: "https://www.amazon.com/Apple-MacBook-Laptop-12-core-16-core/dp/B0DLHY2BJ6/ref=sr_1_3?dib=eyJ2IjoiMSJ9.SiTN0uy0qE9ctdc3d0GhSJpvv4VSK4lXKaD4yJGcqhLMZk4dlSf6bYQ4KSdqKdJlTRpzvUhn4WhcT8QHWRK03JXo-cYWZEApI3XZUNsEN0qbwU5F_hjP-3GLdU7G_1qfecL6xQUHsr901jtj0qWVWnSXJDX5SXgmWy_FAljk5v_4Vm5x-p6fHRMNAFwr_BgL3aD_tYd6T4lWun6AOV_CAaHB7jMR-tifVelU4egD628.27CA8Ah1SDU6KpurcUpWukIVLu5meMIZWtBoJvhF3vs&dib_tag=se&keywords=macbook+pro&qid=1747133379&sr=8-3",
  //     specifications: {
  //       Brand: "Apple",
  //       "Model Name": "MacBook Pro",
  //       "Screen Size": "14.2 Inches",
  //       Color: "Space Black",
  //       "Hard Disk Size": "512 GB",
  //       "CPU Model": "Apple M4",
  //       "Ram Memory Installed Size": "24 GB",
  //       "Operating System": "Mac OS",
  //       "Special Feature": "Fingerprint Reader, Backlit Keyboard",
  //       "Graphics Card Description": "Integrated",
  //     },
  //     asin: "B0DLHY2BJ6",
  //     imgUrl:
  //       "https://m.media-amazon.com/images/I/61-oTP1X4rL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
  //   },
  //   {
  //     title:
  //       "2024 MacBook Pro Laptop with M4 Pro, 12-core CPU, 16-core GPU: Built for Apple Intelligence, 14.2-inch Liquid Retina XDR Display, 24GB Unified Memory, 512GB SSD Storage; Space Black",
  //     link: "https://www.amazon.com/Apple-MacBook-Laptop-12-core-16-core/dp/B0DLHY2BJ6/ref=sr_1_3?dib=eyJ2IjoiMSJ9.SiTN0uy0qE9ctdc3d0GhSJpvv4VSK4lXKaD4yJGcqhLMZk4dlSf6bYQ4KSdqKdJlTRpzvUhn4WhcT8QHWRK03JXo-cYWZEApI3XZUNsEN0qbwU5F_hjP-3GLdU7G_1qfecL6xQUHsr901jtj0qWVWnSXJDX5SXgmWy_FAljk5v_4Vm5x-p6fHRMNAFwr_BgL3aD_tYd6T4lWun6AOV_CAaHB7jMR-tifVelU4egD628.27CA8Ah1SDU6KpurcUpWukIVLu5meMIZWtBoJvhF3vs&dib_tag=se&keywords=macbook+pro&qid=1747133379&sr=8-3",
  //     specifications: {
  //       Brand: "Apple",
  //       "Model Name": "MacBook Pro",
  //       "Screen Size": "14.2 Inches",
  //       Color: "Space Black",
  //       "Hard Disk Size": "512 GB",
  //       "CPU Model": "Apple M4",
  //       "Ram Memory Installed Size": "24 GB",
  //       "Operating System": "Mac OS",
  //       "Special Feature": "Fingerprint Reader, Backlit Keyboard",
  //       "Graphics Card Description": "Integrated",
  //     },
  //     asin: "B0DLHY2BJ6",
  //     imgUrl:
  //       "https://m.media-amazon.com/images/I/61-oTP1X4rL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
  //   },
  //   {
  //     title:
  //       "2024 MacBook Pro Laptop with M4 Pro, 12-core CPU, 16-core GPU: Built for Apple Intelligence, 14.2-inch Liquid Retina XDR Display, 24GB Unified Memory, 512GB SSD Storage; Space Black",
  //     link: "https://www.amazon.com/Apple-MacBook-Laptop-12-core-16-core/dp/B0DLHY2BJ6/ref=sr_1_3?dib=eyJ2IjoiMSJ9.SiTN0uy0qE9ctdc3d0GhSJpvv4VSK4lXKaD4yJGcqhLMZk4dlSf6bYQ4KSdqKdJlTRpzvUhn4WhcT8QHWRK03JXo-cYWZEApI3XZUNsEN0qbwU5F_hjP-3GLdU7G_1qfecL6xQUHsr901jtj0qWVWnSXJDX5SXgmWy_FAljk5v_4Vm5x-p6fHRMNAFwr_BgL3aD_tYd6T4lWun6AOV_CAaHB7jMR-tifVelU4egD628.27CA8Ah1SDU6KpurcUpWukIVLu5meMIZWtBoJvhF3vs&dib_tag=se&keywords=macbook+pro&qid=1747133379&sr=8-3",
  //     specifications: {
  //       Brand: "Apple",
  //       "Model Name": "MacBook Pro",
  //       "Screen Size": "14.2 Inches",
  //       Color: "Space Black",
  //       "Hard Disk Size": "512 GB",
  //       "CPU Model": "Apple M4",
  //       "Ram Memory Installed Size": "24 GB",
  //       "Operating System": "Mac OS",
  //       "Special Feature": "Fingerprint Reader, Backlit Keyboard",
  //       "Graphics Card Description": "Integrated",
  //     },
  //     asin: "B0DLHY2BJ6",
  //     imgUrl:
  //       "https://m.media-amazon.com/images/I/61-oTP1X4rL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
  //   },
  //   {
  //     title:
  //       "2024 MacBook Pro Laptop with M4 Pro, 12-core CPU, 16-core GPU: Built for Apple Intelligence, 14.2-inch Liquid Retina XDR Display, 24GB Unified Memory, 512GB SSD Storage; Space Black",
  //     link: "https://www.amazon.com/Apple-MacBook-Laptop-12-core-16-core/dp/B0DLHY2BJ6/ref=sr_1_3?dib=eyJ2IjoiMSJ9.SiTN0uy0qE9ctdc3d0GhSJpvv4VSK4lXKaD4yJGcqhLMZk4dlSf6bYQ4KSdqKdJlTRpzvUhn4WhcT8QHWRK03JXo-cYWZEApI3XZUNsEN0qbwU5F_hjP-3GLdU7G_1qfecL6xQUHsr901jtj0qWVWnSXJDX5SXgmWy_FAljk5v_4Vm5x-p6fHRMNAFwr_BgL3aD_tYd6T4lWun6AOV_CAaHB7jMR-tifVelU4egD628.27CA8Ah1SDU6KpurcUpWukIVLu5meMIZWtBoJvhF3vs&dib_tag=se&keywords=macbook+pro&qid=1747133379&sr=8-3",
  //     specifications: {
  //       Brand: "Apple",
  //       "Model Name": "MacBook Pro",
  //       "Screen Size": "14.2 Inches",
  //       Color: "Space Black",
  //       "Hard Disk Size": "512 GB",
  //       "CPU Model": "Apple M4",
  //       "Ram Memory Installed Size": "24 GB",
  //       "Operating System": "Mac OS",
  //       "Special Feature": "Fingerprint Reader, Backlit Keyboard",
  //       "Graphics Card Description": "Integrated",
  //     },
  //     asin: "B0DLHY2BJ6",
  //     imgUrl:
  //       "https://m.media-amazon.com/images/I/61-oTP1X4rL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
  //   },
  // ];

  return (
    <div className="p-5">
      <div className="flex w-full justify-center pb-5">
        <div className="  w-4xl">
          <Input buttonText="Search" handleOnChangeOrClick={scrape} />
        </div>
      </div>
      {/* <div className=" mx-auto  max-w-7xl">Scrapped Products</div> */}
      <div className="flex w-full justify-center ">
        <div className="grid grid-rows-1  max-w-11/12 gap-2 ">
          {products?.map((product) => {
            const specifications = Object.keys(product.specifications);

            return (
              <div
                key={product.asin}
                className="rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="w-full md:w-1/4 p-4 flex items-center justify-center bg-white">

                    <Image
                      src={product.imgUrl}
                      alt={product.title}
                      className="max-h-64 object-contain"
                      width={400}
                      height={400}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col">
                    {/* Product Title with Link */}
                    <Link
                      href={product.link}
                      className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-3 line-clamp-2"
                    >
                      {product.title}
                    </Link>

                    {/* Price could be added here if available */}

                    {/* Product Specifications */}
                    <h3 className="font-medium text-gray-700 mb-2 mt-2">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-4 bg-gray-50 p-4 rounded-md">
                      {specifications.map((spec) => (
                        <div key={spec} className="flex flex-wrap">
                          <span className="font-medium text-gray-700 mr-2">
                            {spec}:
                          </span>
                          <span className="text-gray-600">
                            {product.specifications[spec]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={product.link}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
