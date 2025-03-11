var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb"); // Import ObjectId
var Product = require("../models/product"); // Assuming you have a Product model
var ProductService = require("../services/productService");

// **GET - Render product list page**
router.get("/", async function (req, res) {
  try {
    const productService = new ProductService();

    // Wait for initialization to complete
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("ProductService initialization timed out"));
      }, 5000); // Timeout after 5 seconds

      const checkInterval = setInterval(() => {
        if (productService.isInitialized) {
          clearInterval(checkInterval);
          clearTimeout(timeout);
          resolve();
        }
      }, 50); // Check every 50ms
    });

    const products = await productService.getProductList();
    res.render("product.ejs", { products: products });
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).send("Lỗi server: " + error.message);
  }
});

// **GET - API endpoint to get the full list of products for the product page, client-side rending.**
router.get("/product-list", async function (req, res) {
  try {
    const productService = new ProductService();
    const products = await productService.getProductList();
    res.json(products);
  } catch (error) {
    console.error("Error in API endpoint:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// **GET - Get a single product by ID**
router.get("/get-product", async function (req, res) {
  try {
    const productService = new ProductService();
    const product = await productService.getProduct(req.query.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// **POST - Insert a new product**
router.post("/insert-product", async function (req, res) {
  try {
    const productService = new ProductService();
    const pro = new Product();
    pro.Name = req.body.Name;
    pro.Price = req.body.Price;

    const result = await productService.insertProduct(pro); // Insert the product
    res
      .status(201)
      .json({ status: true, message: "Product inserted successfully" });
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ status: false, message: "Error inserting product" });
  }
});

// **POST - Update an existing product**
router.post("/update-product", async function (req, res) {
  try {
    const productService = new ProductService();
    const pro = new Product();
    pro._id = new ObjectId(req.body.Id); //Ensure id is an objectID
    pro.Name = req.body.Name;
    pro.Price = req.body.Price;

    await productService.updateProduct(pro);
    res.json({ status: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ status: false, message: "Error updating product" });
  }
});

// **DELETE - Delete a product**
router.delete("/delete-product", async function (req, res) {
  try {
    const productService = new ProductService();
    const result = await productService.deleteProduct(req.query.id);
    // Check if the product was actually deleted
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }
    res.json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ status: false, message: "Error deleting product" });
  }
});

module.exports = router;
