const userData=require("../models/userSignUp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp=async(req,res)=>{
  try{
    const {name,email,password}=req.body;
    const userExist=await userData.findOne({email});
    if(userExist){
      return res.json({message:"User Already Exists"});
    }
    const newUser=await userData.create({
      name,email,password
    });
    res.status(201).json({
      message:"User created successfully"
    })
  }
  catch(err){
    return res.status(404).json({
      message:"Error occuring"
    });
  }

}
const login=async(req,res)=>{
const {name,email,password}=req.body;
try{
  const user=await userData.findOne({email});
  if(!user){
    return res.json({message:"User not exists"});
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.json({message:"Why wrong details"});
  }
  const token = jwt.sign(
      { id: user._id },
       process.env.JWT_KEY,   // yaha env variable use karna better hai
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
}
catch(err){
 return res.status(500).json({ message: err.message });
}

}
const logout=async()=>{
 try {
    // agar token frontend me store hai to bas remove karna hota hai
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports={
  signUp,login,logout
}