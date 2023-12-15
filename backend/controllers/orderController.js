const { OrderModel } = require("../models/orderModel");

const fetchOrderedItems = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await OrderModel.find({ customerId }).populate({
      path: 'items.productId',
      select: '-quantity'
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching ordered items:", error.message);
    res.status(500).json({ error: "Failed to retrieve ordered items" });
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate({
      path: 'items.productId',
      select: '-quantity'
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ error: "Failed to retrieve all orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, items, payment, totalPrice, deliveryAddress } = req.body;
    const order = new OrderModel({
      customerId: userId,
      items,
      payment,
      totalPrice,
      deliveryAddress
    });
    await order.save();
    res.status(200).json({ message: "Order placed" });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ error: "Failed to place the order" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true }
    );

    res.status(200).json({ message: "Updated successfully!" });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

module.exports = {
  createOrder,
  fetchOrderedItems,
  updateOrderStatus,
  fetchAllOrders
};
