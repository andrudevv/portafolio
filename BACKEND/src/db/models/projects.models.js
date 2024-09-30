const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NetworkSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    technologiesProject: [
        {
          imageId: { type: Schema.Types.ObjectId, ref: "TECHNOLOGIES" }, 
          
        },
      ],
    url: {
        type: String, 
        required: false
    },
  },
  { timestamps: true }
);

// Definir el modelo basado en el esquema
const Network = mongoose.model("PROJECTS", NetworkSchema);

module.exports = Network;
