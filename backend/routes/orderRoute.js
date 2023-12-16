const express = require("express");
const { IdentityVerifier } = require("../middleware/IdentityVerifier");
const { validateRoute } = require("../middleware/validateRoute");
const orderController = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/place", IdentityVerifier, orderController.createOrder);
orderRouter.get("/customer/:customerId", IdentityVerifier, orderController.fetchOrderedItems);
orderRouter.patch("/update/:orderId", validateRoute, orderController.updateOrderStatus);
orderRouter.get("/", validateRoute, orderController.fetchAllOrders);

module.exports = {
  orderRouter
};
