const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechnologySchema = new Schema({
    url: {
        type: String,
        required: true
      },
      description:{
        type:String,
        require: false
      },
}, { timestamps: true });

// Definir el modelo basado en el esquema
const Technology = mongoose.model('TECHNOLOGIES', TechnologySchema);

module.exports = Technology;