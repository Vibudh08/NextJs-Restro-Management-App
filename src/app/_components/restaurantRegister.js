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

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // validations
    if (!name) newErrors.name = "Restaurant name is required";
    if (!email) newErrors.email = "Email is required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email should be in correct format";
    if (!password) newErrors.password = "Password is required";
    if (!cpassword) newErrors.cpassword = "Confirm Password is required";
    if (password && cpassword && password !== cpassword)
      newErrors.cpassword = "Passwords do not match";
    if (!city) newErrors.city = "City is required";
    if (!address) newErrors.address = "Address is required";
    if (!mobile) newErrors.mobile = "Contact number is required";

    // if errors exist, set and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // clear errors if valid

    const userData = {
      name,
      email,
      password,
      city,
      address,
      mobile,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant",
        userData
      );

      if (response.data.success == true) {
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
        <div>
          <input
            value={name}
            type="text"
            placeholder="Restaurant Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            value={email}
            type="text"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            value={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            value={cpassword}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCpassword(e.target.value)}
          />
          {errors.cpassword && (
            <p className="text-red-500 text-sm">{errors.cpassword}</p>
          )}
        </div>

        <div>
          <input
            value={city}
            type="text"
            placeholder="City"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <input
            value={address}
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div>
          <input
            value={mobile}
            type="tel"
            placeholder="Contact Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

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
