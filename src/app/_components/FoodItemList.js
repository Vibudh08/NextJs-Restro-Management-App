"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
const FoodItemList = () => {
  const [details, setDetails] = useState([]);

  // fetch food items
  const fetchData = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurant"));
    if (restaurantData) {
      const resto_id = restaurantData._id;
      const { data } = await axios.post(
        "http://localhost:3000/api/restaurant/food/foodList",
        { resto_id }
      );
      setDetails(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase tracking-wide">
            <th className="p-3 border-b rounded-tl-2xl">S.No.</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Price</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Image</th>
            <th className="p-3 border-b rounded-tr-2xl text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.length > 0 ? (
            details.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3 border-b text-gray-600">{index + 1}</td>
                <td className="p-3 border-b font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="p-3 border-b border-gray-600 text-green-600 font-semibold">
                  ₹{item.price}
                </td>
                <td className="p-3 border-b text-gray-600">{item.desc}</td>
                <td className="p-3 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="p-3 border-b text-center">
                  <div className="flex justify-center gap-1">
                    <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition">
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-red-100 text-red-600 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-500 italic">
                No food items available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default FoodItemList;
