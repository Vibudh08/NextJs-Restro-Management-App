import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant",
        {
          email,
          password,
          login: true,
        }
      );
      if (response.data.success == true) {
        alert("Login Successfull");
        // destructure result safely and remove password
        const { password, ...restData } = response.data.result;

        localStorage.setItem("restaurant", JSON.stringify(restData));
        router.push("/restaurant/dashboard");
      } else {
        alert("Email and password is wrong");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-6 text-center">Restaurant LogIn</h1>
      <form className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleClick}
        >
          LogIn
        </button>
      </form>
    </>
  );
};

export default RestaurantLogin;
