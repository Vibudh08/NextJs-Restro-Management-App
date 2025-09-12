import Link from "next/link";

const CustomerHeader = () => {
  return (
    <header className="bg-white shadow-md z-50">
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
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Add Restaurant
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default CustomerHeader;
