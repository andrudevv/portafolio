const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    document: {
      type: Schema.Types.Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Schema.Types.Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryToken: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    userTechnologies: [
      {
        imageId: { type: Schema.Types.ObjectId, ref: "TECHNOLOGIES" }, 
        description: {
          type: String,
          required: false,
          default: null,
        },
      },
    ],
    userNetworks: [
      {
        imageId: { type: Schema.Types.ObjectId, ref: "NETWORKS" }, 
        url: {
          type: String,
          required: false,
          default: null,
        },
      },
    ],
    
  },
  { timestamps: true }
);

// Definir el modelo basado en el esquema
const User = mongoose.model("USER", UserSchema);

module.exports = User;
