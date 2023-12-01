const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const mongouri = process.env.mongouri;
    const { connection } = await mongoose.connect(mongouri);
    console.log(`Mongodb Connected ${connection.host} ${connection.name} `);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = dbConnect;
