"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const AddFoodItem = ({ id, onItemAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Food name is required";
    if (!price) newErrors.price = "Price is required";
    if (!image) newErrors.image = "Image path is required";
    if (!desc) newErrors.desc = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurant"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }
    const foodData = { name, price, image, desc, resto_id };
    // console.log("Food Item Data:", foodData);

    const data = await axios.post(
      "https://next-js-restro-management-app-6r7s.vercel.app/api/restaurant/food",
      foodData
    );
    if (data) {
      alert("Food item added");
      console.log(data);
    }
    if (onItemAdded) onItemAdded();

    setName("");
    setPrice("");
    setImage("");
    setDesc("");
  };

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        const result = await axios.get(
          `https://next-js-restro-management-app-6r7s.vercel.app/api/restaurant/food/foodList/${id}`
        );
        console.log(result.data);
        let data = result.data;
        setName(data.name);
        setDesc(data.desc);
        setImage(data.image);
        setPrice(data.price);
      };
      fetchItem();
    }
  }, [id]);

  const handleUpdate = async (id) => {
    const foodData = { name, price, image, desc };
    const result = await axios.post(
      `https://next-js-restro-management-app-6r7s.vercel.app/api/restaurant/food/foodList/${id}`,
      foodData
    );
    console.log(result);
    if (result) {
      alert("Food item updated successfully");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        {id ? "🍽️ Update Food Item" : "🍽️ Add Food Item"}
      </h2>
      <form className="space-y-5">
        {/* Food Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name
          </label>
          <input
            type="text"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="text"
            placeholder="Enter price (₹)"
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) setPrice(val);
            }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL / Path
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter food description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.desc && (
            <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
          )}
        </div>

        {/* Submit Button */}
        {id ? (
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 shadow-md transition-all"
            onClick={() => handleUpdate(id)}
          >
            Submit
          </button>
        ) : (
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 shadow-md transition-all"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddFoodItem;
