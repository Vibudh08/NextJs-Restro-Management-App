"use client";

import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Select, Input, Card } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function Home() {
  const [queryCityName, setQueryCityName] = useState();
  const [queryRestaurantName, setQueryRestaqurantName] = useState();
  const [cityName, setCityName] = useState([]);
  const [restaurants, setRestaurants] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dataFetch = async () => {
    let result = await axios.get(
      "https://next-js-restro-management-app-6r7s.vercel.app/api/customer/locations"
    );
    setCityName(result.data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const fetchRestaurant = async () => {
    setLoading(true);
    let url =
      "https://next-js-restro-management-app-6r7s.vercel.app/api/customer";
    const params = new URLSearchParams();

    if (queryCityName) params.append("location", queryCityName);
    if (queryRestaurantName) params.append("restaurant", queryRestaurantName);

    if (params.toString()) {
      url += "?" + params.toString();
    }

    const result = await axios.get(url);
    console.log(result.data);
    setRestaurants(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [queryCityName, queryRestaurantName]);

  return (
    <main className="relative h-screen overflow-hidden">
      {/* Fixed Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/food.jpg"
          alt="Food background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header */}
      <CustomerHeader />

      {/* Fixed Search Section */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-10 w-[700px] max-md:w-[95%] flex flex-col items-center space-y-6">
        <h1 className="text-white text-4xl font-bold">Restro Management App</h1>

        <div className="flex w-full bg-white rounded-lg shadow-md overflow-hidden p-2 gap-2">
          <Select
            className="w-[200px] max-md:w-[120px]"
            placeholder="Select Place"
            showSearch
            allowClear
            onChange={(value) => setQueryCityName(value)}
          >
            {cityName.map((city, index) => (
              <Option key={index} value={city}>
                {city}
              </Option>
            ))}
          </Select>

          <Input
            placeholder="Enter food or restaurant"
            className="flex-1"
            onChange={(e) => setQueryRestaqurantName(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="absolute top-[39%] left-0 right-0 bottom-0 overflow-y-auto px-6 scrollbar-hide">
        {loading ? (
          <p className="text-center text-3xl font-bold text-white mt-20">
            Loading...
          </p>
        ) : restaurants && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-20">
            {restaurants &&
              restaurants.map((res, i) => (
                <Card
                  key={i}
                  title={<span className="font-bold text-lg">{res.name}</span>}
                  variant={false}
                  className="shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl"
                  onClick={() => router.push("/restaurant/details/" + res._id)}
                >
                  <p>
                    <span className="font-semibold">City:</span> {res.city}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {res.address}
                  </p>
                  <p>
                    <span className="font-semibold">Mobile:</span> {res.mobile}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {res.email}
                  </p>
                </Card>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-20 space-y-4 h-full">
            <h2 className="text-3xl font-bold text-white">Oops!</h2>
            <p className="text-white text-lg">No restaurants found.</p>
          </div>
        )}
      </div>

      {/* Footer (can stay fixed at bottom or move inside scroll) */}
      <div className="absolute bottom-0 w-full">
        <RestaurantFooter />
      </div>
    </main>
  );
}
