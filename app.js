var express = require("express");
var app = express();

var controller = require(__dirname + "/apps/controllers");

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.use("/partical", express.static(__dirname + "/views/partical"));
app.use(controller); // Moved before static routes to prioritize controllers

var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DatabaseConnection = require("./configs/database/database"); // Đường dẫn đến file DatabaseConnection.js của bạn

async function connectToDatabase() {
  try {
    const client = DatabaseConnection.getMongoClient(); // Get the MongoClient instance
    await client.connect();
    console.log("Kết nối MongoDB thành công!");

    // Optional: Perform a basic operation to verify connection
    const db = client.db(require("./configs/setting.json").mongodb.database); // Access database here
    await db.command({ ping: 1 }); // Send a ping command

    // Store the database object in app.locals for access in controllers
    app.locals.db = db;

    // Start the server *after* successful database connection
    var server = app.listen(3000, function () {
      console.log("server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    // Consider exiting the application if the database connection fails
    process.exit(1); //Exit with an error code
  }
}

connectToDatabase(); // Call the async function
