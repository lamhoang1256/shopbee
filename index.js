const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const authRoutes = require("./api/auth/auth.route");

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json("This is ecommerce api");
});
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
