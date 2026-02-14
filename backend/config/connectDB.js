const mongoose=require("mongoose");

const connectDB=async()=>{

  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database...")
  }
  catch(err){
    console.log("Not connected...")
  }
}

module.exports=connectDB;