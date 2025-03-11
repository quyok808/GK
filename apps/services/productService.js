const { ObjectId } = require("mongodb");
var config = require("../../configs/setting.json");

class ProductService {
  databaseConnection = require("../../configs/database/database");
  product = require("../models/product"); // Assuming this is just a schema definition, not an instance
  client;
  productDatabase;
  productCollection;
  isInitialized = false; // Flag to track initialization status
  initializationError = null; // Store any initialization error

  constructor() {
    this.initialize(); // Call initialize in constructor
  }

  async initialize() {
    try {
      this.client = this.databaseConnection.getMongoClient();
      await this.client.connect(); // Wait for the connection

      this.productDatabase = this.client.db(config.mongodb.database);
      this.productCollection = this.productDatabase.collection("Product"); // Corrected collection name
      this.isInitialized = true; // Set the flag after successful initialization

      console.log("ProductService initialized successfully");
    } catch (error) {
      console.error("Error initializing ProductService:", error);
      this.isInitialized = false; // Ensure flag is false on failure
      this.initializationError = error;
      // Log the error to a file or external service for better traceability
      // Consider using a logging library like Winston or Morgan
      throw error; // Re-throw to prevent further operations
    }
  }

  // Helper method to check initialization status
  checkInitialization() {
    if (!this.isInitialized) {
      if (this.initializationError) {
        throw new Error(
          "ProductService not initialized due to error: " +
            this.initializationError.message
        );
      } else {
        throw new Error("ProductService not initialized yet.");
      }
    }
  }

  async deleteProduct(id) {
    this.checkInitialization();
    try {
      const result = await this.productCollection.deleteOne({
        _id: new ObjectId(id),
      });
      return result; // Return the result of the operation for better handling in the controller
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  async updateProduct(product) {
    this.checkInitialization();
    try {
      const result = await this.productCollection.updateOne(
        { _id: new ObjectId(product._id) },
        { $set: product }
      );
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async insertProduct(product) {
    this.checkInitialization();
    try {
      const result = await this.productCollection.insertOne(product);
      return result; // Return the result
    } catch (error) {
      console.error("Error inserting product:", error);
      throw error;
    }
  }

  async getProduct(id) {
    this.checkInitialization();
    try {
      const product = await this.productCollection.findOne({
        _id: new ObjectId(id),
      });
      return product;
    } catch (error) {
      console.error("Error getting product:", error);
      throw error;
    }
  }

  // **OPTIMIZED - Gets all products (using existing connection)**
  async getProductList() {
    this.checkInitialization();
    try {
      const products = await this.productCollection.find({}).toArray(); // Use already connected collection
      return products;
    } catch (error) {
      console.error("Error getting product list:", error);
      throw error;
    }
  }
}

module.exports = ProductService;
