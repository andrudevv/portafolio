const bcrypt = require("bcryptjs");
const User = require("../db/models/user.models.js");
const { createAccessToken } = require("../lib/jwt.js");
const sendEmail = require("../utils/userResetPassword.js");
const { verifyToken } = require("../lib/jwt.js");

// const MunicipalityService = require('../services/municipality.service.js')

// const municipality = new MunicipalityService();

class UserService {
  constructor() {}
  //Ruta registro para el usuario
  async registerUser(body) {
    const userFound = await User.findOne({ where: { email: body.email } });
    if (userFound) {
      throw new Error("El correo electrónico ya existe");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const newUser = await User.create({
      ...body,
      password: passwordHash,
    });
    await newUser.save();
    return newUser;
  }

  async findByEmail(email) {
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      throw new Error("El correo electrónico no existe");
    }
    return userFound;
  }

  // servicio de inicio de sesion
  async login(email, password) {
    const user = await User.findOne({
      email: email,
    });
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!user || !isPasswordValid) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    const { name, lastName } = user;
    return { name, lastName };
  }

  async findProfile(docu) {
    const foundUser = await User.findOne({ document: docu }).select(
      "name lastName phone email description"
    );
    if (!foundUser) {
      throw new Error("Error en el usuario.");
    }
    return foundUser;
  }

  async sendEmailForgot(email) {
    try {
      const user = await User.findOne({ email: email });
      const token = await createAccessToken({
        document: user.document,
        name: user.name,
      });
      const tokenEnc = btoa(token);
      await User.updateOne(
        { _id: user.id },
        { $set: { recoveryToken: token } }
      );
      await sendEmail(email, tokenEnc);
      return {
        message: `Se ha enviado un correo de recuperación al correo: ${email}`,
      };
    } catch (error) {
      throw new Error("Error en el correo", error.message);
    }
  }

  //servicio para cambiar la contraseña por medio de token enviado al correo
  async changePassword(token, newPassword) {
    const payload = verifyToken(token);
    const user = await User.findOne({ document: payload.document });
    if (user.recoveryToken !== token) {
      throw new Error(
        "No autorizado, Solicite nuevamente la recuperación de la contraseña"
      );
    }
    const hash = await bcrypt.hash(newPassword, 10);
    const updatePassword = await User.updateOne(
      { document: user.document },
      { $set: { recoveryToken: null, password: hash } }
    );
    if (!updatePassword) {
      throw new Error("Error al actualizar la contraseña");
    }
    return {
      message: "La contraseña ha sido actualizada, Puedes iniciar sesión",
    };
  }

  //servicio para actualziar datos
  async updateUser(docu, changes) {
    try {
      await User.findOne({ document: docu });
    } catch (error) {
      throw new Error("Error en los parametros", error.message);
    }
    if (Object.keys(changes).length == 0) {
      return "No hay datos para actualizar.";
    }
    await User.updateOne({ document: docu }, { $set: changes });
    return true;
  }
}

module.exports = UserService;
