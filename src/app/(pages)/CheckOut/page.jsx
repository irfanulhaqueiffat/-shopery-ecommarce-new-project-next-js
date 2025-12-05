"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// File: app/checkout/[id]/page.jsx
// Fetch product from https://dummyjson.com/products/{id}
// TailwindCSS classes used. Checkout button uses green-500 and a hover effect.

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params || {};

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch the product by id from dummyjson
        const res = await fetch(`https://dummyjson.com/products/${id}`, { signal });

        if (!res.ok) {
          // If server returns 404 or other error
          if (res.status === 404) {
            setProduct(null);
            setError("Product not found (404).");
          } else {
            throw new Error(`API error: ${res.status}`);
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        // dummyjson's product object has fields like: { id, title, price, images, description, ... }
        const normalized = {
          id: String(data.id),
          title: data.title,
          price: Number(data.price),
          image: Array.isArray(data.images) && data.images.length ? data.images[0] : "/images/watch.jpg",
          description: data.description || "",
        };

        setProduct(normalized);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to fetch product:", err);
        setError("Failed to load product. Please try again.");
        setLoading(false);
      }
    }

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  const increment = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!product) return;
    // Replace this with real payment integration (Stripe, bKash SDK, etc.)
    alert(`Checking out ${quantity} × ${product.title} — Total: $${(
      product.price * quantity
    ).toFixed(2)}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-500 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <p className="text-gray-500 mt-2">Try a different product id like /checkout/1</p>
        </div>
      </div>
    );

  const subtotal = product.price * quantity;
  const shipping = subtotal > 100 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product summary */}
          <div className="flex flex-col gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-56 object-cover rounded-lg shadow-sm"
            />
            <div>
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
              {product.description && <p className="text-sm text-gray-600 mt-1">{product.description}</p>}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={decrement}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="px-4 py-1 border rounded-md">{quantity}</div>
              <button
                onClick={increment}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Add a note</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Delivery instructions or gift message"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-400 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                rows={3}
              />
            </div>
          </div>

          {/* Checkout form */}
          <form className="p-4 bg-gray-50 rounded-lg" onSubmit={handleCheckout}>
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-800 font-semibold">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                required
                placeholder="Ex: John Doe"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-400 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                required
                placeholder="Street, City, ZIP"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-400 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Payment method</label>
              <select className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-green-400 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                <option>Card (Stripe)</option>
                <option>Mobile (bKash/Nagad)</option>
                <option>Cash on Delivery</option>
              </select>
            </div>

            {/* Checkout button - green-500 and hover effect */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 hover:scale-105 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Checkout — Pay ${total.toFixed(2)}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">By completing this purchase you agree to our terms and conditions.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
