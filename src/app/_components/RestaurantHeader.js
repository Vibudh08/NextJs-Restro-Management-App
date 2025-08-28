"use client"; 

import Link from "next/link";

export default function RestaurantHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <img src="/app_logo.png" className="w-32" alt="" />

        {/* Navigation */}
        <nav className="space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            href="/signup"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            SignUp / Login
          </Link>
          <Link
            href="/profile"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}