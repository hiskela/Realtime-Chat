import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  registerUser
} from "../services/auth.service";


function Register(){

  const navigate = useNavigate();


  const [formData,setFormData]=useState({

    name:"",
    username:"",
    email:"",
    password:""

  });


  const [errors,setErrors]=useState({});

  const [loading,setLoading]=useState(false);



  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    setErrors({});


    try{

      setLoading(true);


      await registerUser(formData);


      toast.success(
        "Account created successfully"
      );


      navigate("/login");


    }catch(error){


      const response =
        error.response?.data;



      if(response?.errors){

        const fieldErrors={};


        response.errors.forEach(error=>{

          fieldErrors[error.field]=error.message;

        });


        setErrors(fieldErrors);


      }
      else{

        toast.error(
          response?.message ||
          "Registration failed"
        );

      }


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
          Register
        </h1>



        <input
          className="w-full border p-3 rounded mb-1"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.name}
        </p>




        <input
          className="w-full border p-3 rounded mb-1"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.username}
        </p>





        <input
          className="w-full border p-3 rounded mb-1"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.email}
        </p>





        <input
          className="w-full border p-3 rounded mb-1"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.password}
        </p>





        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >

          {loading ? "Creating..." : "Register"}

        </button>



        <p className="text-center mt-4">

          Already have account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>


      </form>


    </div>

  );

}


export default Register;