"use client";
import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import FoodItemList from "@/app/_components/FoodItemList";

const Page = () => {
  const [showForm, setShowForm] = useState(false);

  // handle new item added
  const handleItemAdded = async () => {
    await fetchData();
    setShowForm(false);
  };

  return (
    <>
      <RestaurantHeader />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
          🍴 Welcome to Dashboard
        </h1>

        {showForm ? (
          <div className="mt-6 bg-white ">
            <AddFoodItem onItemAdded={handleItemAdded} />
          </div>
        ) : (
          <FoodItemList />
        )}

        {/* Add New Item Button and Back Button */}
        <div className="mt-6 text-center">
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition mx-auto"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                <ArrowLeft size={18} /> Back To List
              </>
            ) : (
              <>
                <Plus size={18} /> Add New Item
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
