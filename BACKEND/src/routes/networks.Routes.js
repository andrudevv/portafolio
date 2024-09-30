const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
//
const NetworkService = require("../service/network.service.js");
//const LaundryService = require("../services/laundry.service.js");
const {authRequiredUser} = require("../middlewares/validateToken.js");
const {createNetworkShema, getNetworkShemaId , getAndUpdateNetworkShema} = require("../schemas/network.schema.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { checkUser } = require("../middlewares/auth.handler.js");
const { createAccessToken } = require("../lib/jwt.js");
const networkRouter = express.Router();
const service = new NetworkService();


/// crear una red social
networkRouter.post("/register",
  authRequiredUser,
  validatorHandler(createNetworkShema, "body"), 
  async (req, res, next) => {
    try {
      const idUser = req.user.document; 
      const { url, img } = req.body;  
      const send = await service.registerNetwork( url, img,idUser);
      res.status(201).json(send);
    } catch (error) {
      next(error);
    }
  });

  //consultar red por id
networkRouter.get("/:id",
  authRequiredUser,
  checkUser,
  validatorHandler(getNetworkShemaId, "params"), 
   async (req, res, next) => {
    try { 
      const {id} = req.params;
      const idUser = req.user.document; 
      const response = await service.viewNetwork(idUser, id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });




//consultar todas las redes para mostrar
networkRouter.get("/",
    authRequiredUser,
     checkUser, 
    
     async (req, res, next) => {
    try {
      const user = req.user.document;
      const response = await service.viewMyNetworks(user);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });

//actualizar una red
networkRouter.patch(
  "/:id",
  authRequiredUser,
  checkUser,
  validatorHandler(getNetworkShemaId, "params"), 
  validatorHandler(getAndUpdateNetworkShema, "body"), 
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user.document;
      const {id} = req.params;
      await service.updateNetwork(user,id, body);
      res.status(201).json("Actualizado correctamente");
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
/// eliminar una red
networkRouter.delete(
  "/:id",
  authRequiredUser,
  checkUser,
  validatorHandler(getNetworkShemaId, "params"), 
  async (req, res, next) => {
    try {
      const user = req.user.document;
      const {id} = req.params;
      await service.deleteNetwork(user,id);
      res.status(201).json("Eliminado correctamente");
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
  
  

  module.exports = networkRouter;
