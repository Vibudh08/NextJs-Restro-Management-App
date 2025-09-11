"use client";

import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select, Input } from "antd";

const { Option } = Select;

export default function Home() {
  const [cityName, setCityName] = useState([]);

  const dataFetch = async () => {
    let result = await axios.get(
      "http://localhost:3000/api/customer/locations"
    );
    console.log(result.data);
    setCityName(result.data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <main className="relative flex flex-col min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/food.jpg"
          alt="Food background"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
      </div>

      {/* Header */}
      <CustomerHeader />

      {/* Centered Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center mt-[-40px] space-y-6">
        <h1 className="text-white text-4xl font-bold">Food Delivery App</h1>

        {/* Search Bar */}
        <div className="flex w-[700px] bg-white rounded-lg shadow-md overflow-hidden backdrop-blur-sm p-2 gap-2">
          {/* Antd Select */}
          <Select
            placeholder="Select Place"
            style={{ width: 200 }}
            showSearch
            allowClear
            styles={{
              popup: {
                root: { maxHeight: 200, overflowY: "auto" },
              },
            }}
          >
            {cityName.map((city, index) => (
              <Option key={index} value={city}>
                {city}
              </Option>
            ))}
          </Select>

          {/* Input Field */}
          <Input placeholder="Enter food or restaurant" className="flex-1" />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <RestaurantFooter />
      </div>
    </main>
  );
}
