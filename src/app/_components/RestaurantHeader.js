"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RestaurantHeader() {
  const [details, setDetails] = useState();
  const router = useRouter();
  useEffect(() => {
    const data = localStorage.getItem("restaurant");
    setDetails(data);
  }, []);
  const handleLogout = () => {
    alert("Logout Successfull");
    localStorage.removeItem("restaurant");
    router.push("/restaurant");
  };
  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img src="/restaurant.png" className="w-16" alt="" />
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          {details ? (
            <button
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/restaurant"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              SignUp / Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
