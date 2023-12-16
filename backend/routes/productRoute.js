const express = require("express");
const productController = require("../controllers/productController");
const { validateRoute } = require("../middleware/validateRoute");

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/add", validateRoute, productController.createProduct);
productRouter.put("/update/:id", validateRoute, productController.updateProductById);
productRouter.delete("/delete/:id", validateRoute, productController.deleteProductById);

module.exports = {
    productRouter
};
