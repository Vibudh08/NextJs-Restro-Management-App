const RestaurantLogin = () => {
  return (
    <>
      <h1 className="text-xl font-bold mb-6 text-center">Restaurant LogIn</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          LogIn
        </button>
      </form>
    </>
  );
};
export default RestaurantLogin;
