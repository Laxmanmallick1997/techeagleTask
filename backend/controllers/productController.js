const { ProductModel } = require("../models/productModel");

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getAllProducts:", error.message);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error in getProductById:", error.message);
        res.status(500).json({ error: "Failed to fetch product" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newProduct = new ProductModel({ name, description, price });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error in createProduct:", error.message);
        res.status(500).json({ error: "Failed to add product" });
    }
};

const updateProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const { name, description, price } = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            { name, description, price },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error in updateProductById:", error.message);
        res.status(500).json({ error: "Failed to update product" });
    }
};

const deleteProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProductById:", error.message);
        res.status(500).json({ error: "Failed to delete product" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
};
