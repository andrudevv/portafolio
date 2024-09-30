const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NetworkSchema = new Schema({
  
  url:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Definir el modelo basado en el esquema
const Network = mongoose.model('NETWORKS', NetworkSchema);

module.exports = Network;