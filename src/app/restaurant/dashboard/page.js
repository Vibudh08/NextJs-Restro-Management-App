"use client";
import { useEffect, useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import FoodItemList from "@/app/_components/FoodItemList";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  // handle new item added
  const handleItemAdded = async () => {
    setShowForm(false);
    setSelectedId(null);
  };

  useEffect(()=>{
    const data = localStorage.getItem("restaurant")
    if(!data){
      router.push("/restaurant")      
    }
  },[])

  return (
    <>
      <RestaurantHeader />
      <div className="max-w-5xl mx-auto p-6 max-md:px-4">
        <h1 className="text-3xl max-md:text-2xl font-extrabold text-center text-gray-800 mb-10">
          🍴 Welcome to Dashboard
        </h1>

        {showForm ? (
          <div className="mt-6 bg-white ">
            <AddFoodItem id={selectedId} onItemAdded={handleItemAdded} />
          </div>
        ) : (
          <FoodItemList
            onEdit={(id) => {
              setSelectedId(id);
              setShowForm(true);
            }}
          />
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
