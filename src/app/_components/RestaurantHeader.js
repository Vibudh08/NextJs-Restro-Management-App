"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RestaurantHeader() {
  const [details, setDetails] = useState();
  const router = useRouter()
  useEffect(() => {
    const data = localStorage.getItem("restaurant");
    setDetails(data);
  }, []);
  const handleLogout= ()=>{
    alert("Logout Successfull")
    localStorage.removeItem("restaurant")
    router.push("/restaurant")
  }
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
          {details ? (
            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/signup"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              SignUp / Login
            </Link>
          )}
          {details ? (
            <button className="text-gray-700 hover:text-blue-600 transition" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    </header>
  );
}
