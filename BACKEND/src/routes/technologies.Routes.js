const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
//
const NetworkService = require("../service/network.service.js");
//const LaundryService = require("../services/laundry.service.js");
const {authRequiredUser} = require("../middlewares/validateToken.js");
//const {} = require("../schemas/technology.schema.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { checkUser } = require("../middlewares/auth.handler.js");
const { createAccessToken } = require("../lib/jwt.js");
const technologyRouter = express.Router();
const service = new NetworkService();


/// crear una red social
technologyRouter.post("/register", async (req, res, next) => {
    try {
      const { idUser, url } = req.body;  //pendiente imagen
      const send = await service.registerNetwork(idUser, url);
      res.status(201).json(send);
    } catch (error) {
      next(error);
    }
  });
  technologyRouter.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.viewNetwork(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });



  
  module.exports = technologyRouter;