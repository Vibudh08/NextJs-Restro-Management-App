"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useParams } from "next/navigation";

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:3000/api/customer/${id}`);
    console.log(result);
    setRestaurantData(result.data.data);
    setFoodItems(result.data.foodItems);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   if (!restaurantData)
  //     return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <CustomerHeader />
      <div className="min-h-screen  bg-gray-100">
        {/* Restaurant Details */}
        <div className="relative h-[400px] w-full mb-10">
          <Image
            src="/a.jpg"
            alt="Restaurant Banner"
            fill
            className="object-cover w-full h-full"
            unoptimized
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-10 bg-black/40 text-white space-y-3">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              {restaurantData?.name}
            </h1>
            <p className="text-2xl font-semibold drop-shadow">
              {restaurantData?.city}
            </p>
            <p className="text-lg drop-shadow">{restaurantData?.address}</p>
            <p className="text-lg drop-shadow">{restaurantData?.mobile}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-black mb-6">
            Menu
          </h2>
        </div>

        {/* Food Items */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 pb-8 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item, i) => (
            <Card
              key={i}
              hoverable
              cover={
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-2xl"
                    unoptimized
                  />
                </div>
              }
              className="shadow-lg rounded-2xl flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500">{item.desc}</p>
                <p className="mt-2 font-semibold">₹{item.price}</p>
              </div>

              {/* Add to Cart Button */}
              {/* <button
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition-colors"
                onClick={() => console.log(`Added ${item.name} to cart`)}
              >
                Add to Cart
              </button> */}
            </Card>
          ))}
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
}
