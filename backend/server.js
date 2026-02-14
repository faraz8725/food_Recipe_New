require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const recipe = require("./routes/recipeRoutes");
const signUp=require("./routes/signUpRoutes");

const app = express();
app.use(express.json());

connectDB()
  app.use("/recipe", recipe);
  app.use("/signUp",signUp);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);
  });
