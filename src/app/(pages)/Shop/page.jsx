'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ProductCart from '../../components/ProductCart' 
import Link from 'next/link'
import { FaHome } from "react-icons/fa";

const page = () => {
    const [showFilter, setShowFilter] = useState(false);

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 0])

  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('lowest')

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12 // প্রতি পেজে কতো প্রোডাক্ট দেখাবে

  // ✅ API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100')

        if (!res.ok) throw new Error('Failed to fetch products')

        const data = await res.json()
        const items = data.products || []

        setProducts(items)

        const prices = items.length ? items.map((p) => Number(p.price)) : [0]
        const min = Math.min(...prices)
        const max = Math.max(...prices)

        setMinPrice(min)
        setMaxPrice(max)
        setPriceRange([min, max])
      } catch (err) {
        console.error(err)
        setError('Could not load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const set = new Set()
    products.forEach((p) => set.add(p?.category))
    return Array.from(set)
  }, [products])


  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating)
    }

    if (sortBy === 'lowest') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    }

    return list
  }, [products, selectedCategory, priceRange, minRating, sortBy])


  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, priceRange, minRating, sortBy])

  const maxPage = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))
  const totalPages = Math.min(10, maxPage) 
  useEffect(() => {
    const mp = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))
    const tp = Math.min(10, mp)
    if (currentPage > tp) {
      setCurrentPage(tp)
    }
  }, [filteredProducts.length, productsPerPage, currentPage])

  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <>
     <section className="py-10 md:py-14 bg-green-700">
        {/* Breadcrumb */}
        <div className="breadcrumbs flex flex-wrap items-center text-sm py-12 text-gray-600 lg:mt-6 lg:ml-8 space-x-2">
          <Link href="/" className="flex items-center text-gray-500 hover:text-green-600 transition">
            <FaHome className="mr-1 lg:ml-[300px]" />
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/" className="text-gray-500 hover:text-green-600 transition">
            Categories
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/" className="text-gray-500 hover:text-green-600 transition">
            Products
          </Link>
        </div>
        
        <div className="container mx-auto px-4  text-white mt-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 gap-4 mb-6">
                      <button
                      onClick={() => setShowFilter(!showFilter)}
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20B526] text-sm font-medium w-max transition"
>
                  <span>{showFilter ? "Close Filter" : "Filter"}</span>
                   </button>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-gray-300">Sort by:</span>
              <select
                className="bg-[#111111] border border-[#333] rounded-md px-3 py-2 text-sm focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="lowest">Lowest price</option>
                <option value="highest">Highest price</option>
                <option value="rating">Best rating</option>
                <option value="az">A - Z</option>
              </select>
            </div>
          </div>

          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 bg-green-500 border border-[#222] rounded-2xl p-4 md:p-5 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold mb-3">All Categories</h3>
                <ul className="space-y-2 text-sm">
                  <li
                    className={`cursor-pointer flex justify-between ${
                      selectedCategory === 'all' ? 'text-[#20B526]' : ''
                    }`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    <span>All</span>
                    <span className="text-gray-400">{products.length}</span>
                  </li>
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`cursor-pointer flex justify-between capitalize ${
                        selectedCategory === cat ? 'text-[#20B526]' : ''
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{cat.replace('-', ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Price</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-gray-300">
                    Price: ${priceRange[0].toFixed(2)} - $
                    {priceRange[1].toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Rating</h3>
                <div className="space-y-2 text-xs">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={r}
                        checked={minRating === r}
                        onChange={() => setMinRating(r)}
                      />
                      <span>
                        {Array.from({ length: r })
                          .map(() => '★')
                          .join('')}{' '}
                        &amp; up
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={0}
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                    />
                    <span>Any rating</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products */}
            <main className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
                <span>{filteredProducts.length} Results Found</span>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {loading && (
                <p className="text-center text-gray-400 mt-10">
                  Loading products...
                </p>
              )}

              {error && !loading && (
                <p className="text-center text-red-500 mt-10">{error}</p>
              )}

              {!loading && !error && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {currentProducts.map((product) => (
                      <ProductCart key={product.id} product={product} />
                    ))}
                  </div>

                  {/*  Pagination */}
                  {/* ✅ Pagination */}
<div className="flex justify-center items-center gap-3 mt-7">
  {/* Prev Button */}
  <button
    className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-xs text-gray-300 hover:bg-green-600 hover:text-white transition disabled:opacity-30"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    &lt;
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }).map((_, i) => {
    const pageNum = i + 1
    const isActive = currentPage === pageNum

    return (
      <button
        key={pageNum}
        onClick={() => setCurrentPage(pageNum)}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition
          ${
            isActive
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white'
          }`}
      >
        {pageNum}
      </button>
    )
  })}

  {/* Next Button */}
  <button
    className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-xs text-gray-300 hover:bg-green-600 hover:text-white transition disabled:opacity-30"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    &gt;
  </button>
</div>

                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
