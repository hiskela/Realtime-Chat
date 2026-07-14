import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await registerUser(formData);

      alert("Registration successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
          Register
        </h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button className="w-full bg-green-600 text-white py-3 rounded">
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            className="text-blue-600"
            to="/"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;