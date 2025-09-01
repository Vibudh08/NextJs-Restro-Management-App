import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RestaurantRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      cpassword,
      city,
      address,
      mobile,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant",
        userData
      );

      if (response.data) {
        alert("Restaurant registration successful");

        const { password, cpassword, ...restData } = userData;

        localStorage.setItem("restaurant", JSON.stringify(restData));

        router.push("/restaurant/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-6 text-center">Restaurant Signup</h1>
      <form className="space-y-4">
        <input
          value={name}
          type="text"
          placeholder="Restaurant Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={email}
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={cpassword}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCpassword(e.target.value)}
        />
        <input
          value={city}
          type="text"
          placeholder="City"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          value={address}
          type="text"
          placeholder="Address"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          value={mobile}
          type="tel"
          placeholder="Contact Number"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMobile(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleClick}
        >
          Signup
        </button>
      </form>
    </>
  );
};
export default RestaurantRegister;
