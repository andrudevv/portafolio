
const mongoose = require("mongoose");
const  URI =
"mongodb+srv://ANDRU:tech12345@tech4.lpmhd.mongodb.net/?retryWrites=true&w=majority&appName=TECH4";
async function connectToDatabase() {
    try {
      await mongoose.connect(URI, {});
      console.log("Conectado a la DB");
    } catch (err) {
      console.error("Error al conectar a la DB:", err);
    }
  }

module.exports = {connectToDatabase}  