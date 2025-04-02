"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductPage({ params }) {
  const router = useRouter();
  const { id } = params; // Get the dynamic route parameter (QR code value)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      router.push("/"); // Redirect to the home page if no ID is provided
      return;
    }

    // Retrieve product details from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || {};
    const productDetails = products[id];

    if (!productDetails) {
      alert("Product not found!");
      router.push("/"); // Redirect to the home page if the product is not found
    } else {
      setProduct(productDetails); // Set the product details
    }
  }, [id, router]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Product Details</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={256}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <p className="text-sm text-gray-500">QR Code: {id}</p>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
}