"use client";

import { useEffect, useState } from "react";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { useRouter } from "next/navigation";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantRegister from "../_components/restaurantRegister";

export default function RestaurantAuth() {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  useEffect(() => {
    const data = localStorage.getItem("restaurant");
    if (data) {
      router.push("/restaurant/dashboard");
    }
  }, []);

  return (
    <div>
      <RestaurantHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Restaurant Login / SignUp</h1>

          {login ? <RestaurantLogin/> : <RestaurantRegister/>}

          <button
            onClick={() => setLogin(!login)}
            className="mt-6 w-full border border-gray-300 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {login ? "Don't have an account?" : "Already have an account?"}
          </button>
        </div>
      </div>
      <RestaurantFooter />
    </div>
  );
}
