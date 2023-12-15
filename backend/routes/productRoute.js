const express = require("express");
const productController = require("../controllers/productController");
const { protectRoute } = require("../middleware/protectRoute");

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/add", protectRoute, productController.createProduct);
productRouter.put("/update/:id", protectRoute, productController.updateProductById);
productRouter.delete("/delete/:id", protectRoute, productController.deleteProductById);

module.exports = {
    productRouter
};
