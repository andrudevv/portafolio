
const bcrypt = require('bcryptjs');
const Network = require('../db/models/network.models.js');
const {createAccessToken} = require('../lib/jwt.js');
//const sendEmailForgot = require('../utils/userResetPassword.js');
const {verifyToken} = require('../lib/jwt.js');
const User = require('../db/models/user.models.js');

class NetworkService {
  constructor() {}
  //Ruta registro para el usuario
  async registerNetwork(url, img, documentUser) {
    try {
      const user = await User.findOne({
        document: documentUser 
      });
      const idUser = user.id;
      const newNetwork = await Network.create({
        idUser, url, img 
      });
      await newNetwork.save();
      console.log('red social creada correctamente');
      console.log(newNetwork);
      return newNetwork;
    } catch (error) {
      throw new Error("Error en el usuario", error.message);
    }
    
  }
  async viewNetwork(documentId,idNetwork) {
    const user = await User.findOne({
      document: documentId 
    })
    const userFound = await Network.findOne({ idUser: user.id, _id: idNetwork  });
    if (!userFound) {
      throw new Error("El usuario no existe");
    }
    return userFound;
  }
  
  async viewMyNetworks(userDocument) {
    try {
      const user = await User.findOne({
        document: userDocument 
      })
      const networkFound = await Network.find({ idUser: user.id  });
      if(Object.keys(networkFound).length == 0){
        return "No se encuentran aun redes sociales.";
      }
      return networkFound;
    } catch (error) {
      throw new Error("Error en el usuario", error.message);
    }
   
    
    
  }
 
  //servicio para actualizar datos
  async updateNetwork(user, id ,changes) {
    try {
    await Network.findOne({idUser: user, document: id});
    } catch (error) {
      throw new Error("Error en los parametros", error.message);
    }
    if(Object.keys(changes).length == 0){
      return "No hay datos para actualizar.";
    }
    await Network.updateOne({document :id}, {$set: changes});
    return true;
  }
  //servicio para eliminar una red social
  async deleteNetwork(user, id ) {
    try {
      const userFound = await User.findOne({
        document: user 
      })
      await Network.deleteOne({_id:id , idUser:userFound.id})
    } catch (error) {
      throw new Error("Error en el usuario", error.message);
    }
    return true;
  }

}

module.exports =NetworkService;
