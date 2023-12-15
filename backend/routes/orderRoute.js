const express = require("express");
const { auth } = require("../middleware/auth");
const { protectRoute } = require("../middleware/protectRoute");
const orderController = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/place", auth, orderController.createOrder);
orderRouter.get("/customer/:customerId", auth, orderController.fetchOrderedItems);
orderRouter.patch("/update/:orderId", protectRoute, orderController.updateOrderStatus);
orderRouter.get("/", protectRoute, orderController.fetchAllOrders);

module.exports = {
  orderRouter
};
