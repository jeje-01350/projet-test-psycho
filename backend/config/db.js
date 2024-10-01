const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}`);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to database");
});

module.exports = db;