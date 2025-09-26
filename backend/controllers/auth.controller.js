import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {  email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({  email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully",user });
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message || "Server Error"
    })
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id,email:user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOption = {
      httpOnly: true,        
      secure: isProduction,  
      sameSite: isProduction ? "strict" : "lax", 
      path: "/",            
      maxAge: 7 * 24 * 60 * 60 * 1000 
    };


    res.cookie("token",token,cookieOption).status(200).json({ token ,user,message:"Login successful"});
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message || "Server Error"
    })
  }
};

