const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { connectionDB } = require("./db/connection");
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { cartRouter } = require("./routes/cartRoute");
const { orderRouter } = require("./routes/orderRoute");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
require('dotenv').config();

// Routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// Database connection
(async () => {
  try {
    await connectionDB;
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
