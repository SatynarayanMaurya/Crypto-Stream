import React, { useState } from "react";
import { motion } from "framer-motion";
import {toast} from "react-toastify"
import {useLocation, useNavigate} from "react-router-dom"
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";
import { setUserDetails } from "../redux/slices/cryptoSlice";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    password: "",
    email:""
  });



  const handleSubmit =async (e) => {
    e.preventDefault();

    if(!formData?.email || !formData?.password){
      toast.warn("Please fill all the field ")
      return ;
    }

    try{
      setLoading(true)
      const result = await apiConnector("POST",authEndpoints.lOGIN,formData)
      toast.success(result?.data?.message )
      dispatch(setUserDetails(result?.data?.user))
      localStorage.setItem("token",result?.data?.token)
      setLoading(false)
      navigate("/")

    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message || "Error in login")
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 p-4">
      {loading && <Spinner/>}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold mb-6 text-center text-gray-800"
        >
          Welcome Back 👋
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-indigo-500`}
              placeholder="you@example.com"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-indigo-500`}
              placeholder="••••••••"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-600 mt-6 text-center"
        >
          Don’t have an account?{" "}
          <span onClick={()=>navigate("/signup")} className="text-indigo-600 font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
