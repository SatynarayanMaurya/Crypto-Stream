import React, { useState } from "react";
import { motion } from "framer-motion";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";


export default function Signup() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading ,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });




  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!formData?.email || !formData.password){
      toast.warn("Please fill all the field !")
      return ;
    }
    try{
      setLoading(true)
      const result = await apiConnector("POST",authEndpoints.SIGN_UP,formData)
      toast.success(result?.data?.message )
      setLoading(false)
      navigate("/login")

    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message || "Error in signup")
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      {loading && <Spinner/>}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-6 text-center text-blue-700"
        >
          Signup
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="john@example.com"
            />
          </motion.div>


          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-600 mt-6 text-center"
        >
          Already have an account?{" "}
          <span onClick={()=>navigate("/login")} className="text-indigo-600 font-medium hover:underline cursor-pointer">
            Login
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
