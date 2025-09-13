import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = () => {
  const [localData, setLocalData] = useState();
  useEffect(() => {
    const data = localStorage.getItem("restaurant");
    setLocalData(data);
    console.log(data);
  }, []);
  return (
    <header className="bg-white shadow-md z-50">
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
          {localData ? (
            <Link
              href="/restaurant/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Manage Restaurant
            </Link>
          ) : (
            <Link
              href="/restaurant"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Add Restaurant
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default CustomerHeader;
