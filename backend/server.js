require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const recipe = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());

connectDB()
  app.use("/recipe", recipe);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);
  });
