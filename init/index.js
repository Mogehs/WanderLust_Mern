const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");
main()
  .then(() => console.log("Connection Established"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66c38cc91a5444011aa79280",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data Initialized");
};
initDb();
