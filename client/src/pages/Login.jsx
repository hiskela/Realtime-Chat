import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      login(res.user, res.token);

      navigate("/chat");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-96 rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          className="w-full border p-3 rounded mb-4"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;