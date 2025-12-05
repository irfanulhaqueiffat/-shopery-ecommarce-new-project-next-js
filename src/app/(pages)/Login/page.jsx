'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Check login state
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setUserData({ username: storedUsername });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    document.cookie = "accessToken=; max-age=0; path=/;";
    document.cookie = "refreshToken=; max-age=0; path=/;";

    setUserData(null);
    router.push("/Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save tokens (optional, since cookies are HttpOnly)
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      localStorage.setItem("username", username);
      setUserData({ username });

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login">
      {/* UI EXACT SAME AS YOUR VERSION */}

      <div className="breadcrumbs flex items-center text-sm py-12 text-gray-600 mt-6 ml-8 space-x-2">
        <Link href="/" className="flex items-center text-gray-500 hover:text-green-600 transition">
          <FaHome className="mr-1 ml-[300px]" />
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-green-600 font-medium">Login</span>
      </div>

      <div className="container">
        <div className="min-h-screen flex flex-col justify-between bg-white">

          <div className="flex flex-col items-center justify-center grow">
            <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

              {error && <p className="text-center text-red-500 mb-3">{error}</p>}

              {userData ? (
                <div className="text-center">
                  <p className="mb-3 text-green-600">
                    Logged in as <strong>{userData.username}</strong>
                  </p>
                  <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-md">
                    Logout
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className="border rounded-md p-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="border rounded-md p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white py-2 rounded-md"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              )}
            </div>
          </div>
          <p> username: 'emilys',
    password: 'emilyspass'</p>

        </div>
      </div>
    </section>
  );
};

export default LoginPage;
