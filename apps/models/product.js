class Product {
  constructor(id, name, price, image, description) {
    if (id && typeof id !== "string") {
      throw new TypeError("ID must be a string");
    }
    if (typeof name !== "string") {
      throw new TypeError("Name must be a string");
    }
    if (typeof price !== "number" || price <= 0) {
      throw new TypeError("Price must be a positive number");
    }
    if (typeof image !== "string") {
      throw new TypeError("Image url must be a string.");
    }

    if (typeof description !== "string") {
      throw new TypeError("Description must be a string.");
    }

    this._id = id;
    this.Name = name;
    this.Price = price;
    this.Image = image;
    this.Description = description;
  }

  // Getters and setters (optional, but recommended)
  get id() {
    return this._id;
  }

  set name(newName) {
    if (typeof newName !== "string") {
      throw new TypeError("Name must be a string");
    }
    this.Name = newName;
  }

  get name() {
    return this.Name;
  }

  set price(newPrice) {
    if (typeof newPrice !== "number" || newPrice <= 0) {
      throw new TypeError("Price must be a positive number");
    }
    this.Price = newPrice;
  }

  get price() {
    return this.Price;
  }

  set image(newImage) {
    if (typeof newImage !== "string") {
      throw new TypeError("Image url must be a string.");
    }
    this.Image = newImage;
  }

  get image() {
    return this.Image;
  }

  set description(newDescription) {
    if (typeof newDescription !== "string") {
      throw new TypeError("Description must be a string.");
    }
    this.Description = newDescription;
  }

  get description() {
    return this.Description;
  }

  // Example method
  getDiscountedPrice(discountPercentage) {
    if (
      typeof discountPercentage !== "number" ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      throw new TypeError(
        "Discount percentage must be a number between 0 and 100"
      );
    }
    return this.Price * (1 - discountPercentage / 100);
  }
}

module.exports = Product;
