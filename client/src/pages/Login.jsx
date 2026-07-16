import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  loginUser
} from "../services/auth.service";

import {
  useAuth
} from "../context/AuthContext";



function Login(){


  const navigate=useNavigate();

  const {
    setUser
  }=useAuth();



  const [formData,setFormData]=useState({

    username:"",
    password:""

  });



  const [loading,setLoading]=useState(false);

  const [error,setError]=useState("");



  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();

    setError("");


    try{

      setLoading(true);


      const response =
        await loginUser(formData);



      setUser(
        response.data.user
      );


      toast.success(
        "Login successful"
      );


      navigate("/chat");


    }catch(error){


      setError(

        error.response?.data?.message ||
        "Login failed"

      );


    }
    finally{

      setLoading(false);

    }


  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >


        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>



        {
          error &&
          <p className="text-red-500 mb-4">
            {error}
          </p>
        }



        <input

          className="w-full border p-3 rounded mb-3"

          name="username"

          placeholder="Username"

          value={formData.username}

          onChange={handleChange}

        />



        <input

          className="w-full border p-3 rounded mb-4"

          name="password"

          type="password"

          placeholder="Password"

          value={formData.password}

          onChange={handleChange}

        />



        <button
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded"
        >

          {loading ? "Login..." : "Login"}

        </button>



        <p className="text-center mt-4">

          No account?

          <Link
            className="text-blue-600 ml-2"
            to="/register"
          >
            Register
          </Link>

        </p>


      </form>


    </div>

  );

}


export default Login;