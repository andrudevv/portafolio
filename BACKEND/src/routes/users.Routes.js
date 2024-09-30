const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
//
const UserService = require("../service/user.service.js");
const {authRequiredUser} = require("../middlewares/validateToken.js");
const {
  updateUserShema,
  createuserShema,
  getUserShema,
  loginShema,
} = require("../schemas/user.schema.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { checkUser } = require("../middlewares/auth.handler.js");
const { createAccessToken } = require("../lib/jwt.js");
const userRouter = express.Router();
const service = new UserService();

// ruta que toma el correo para enviar la recuperacion de la contraseña
userRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const send = await service.sendEmailForgot(email);
    res.status(201).json(send);
  } catch (error) {
    next(error);
  }
});


//registro de usuario
userRouter.post(
  "/register",
  validatorHandler(createuserShema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.registerUser(body); 
      //register(newUser.email, newUser.name);
      const token = await createAccessToken({
        document: newUser.document,
        username: newUser.name,
      });

      res.cookie("tokenUser", token, {
        secure: true,
        sameSite: "none",
      });
      res.status(201).json("Usuario creado correctamente");
    } catch (error) {
      next(error);
      return res.status(500).json([error.message]);
    }(err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
// ruta para iniciar sesion
userRouter.post(
  "/login",
  validatorHandler(loginShema, "body"),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const findUser = await service.login(email, password);
      const token = await createAccessToken({
        document: findUser.document,
        username: findUser.name,
      });
      res.cookie("tokenUser", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      return res.status(200).json(findUser);
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }(err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
//ruta para cerrar sesion
userRouter.post("/logout", authRequiredUser, (req, res) => {
  res.clearCookie("tokenUser", {
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({ message: "hasta pronto" });
});

// cambiar contraseña con un token que se envio al correo para restablecer
userRouter.post("/change-password/:token", async (req, res, next) => {
  try {
    const { tokenUser } = req.params;
    const { newPassword } = req.body;
    const rta = await service.changePassword(tokenUser, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});




userRouter.get(
  "/profile-user",
  authRequiredUser,
  checkUser,
  async (req, res, next) => {
    try {
      const {document} = req.user;
      const userFound = await service.findProfile(document);
      if (!userFound) return res.sendStatus(401);
      return res.status(200).json( userFound);
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);



//actualizar datos sin incluir la contraseña
userRouter.patch(
  "/",
  authRequiredUser,
  checkUser,
  validatorHandler(updateUserShema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const documentUser = req.user.document;
      await service.updateUser(documentUser, body);
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





// ruta necesaria para que el front valide las cookies y manipule el id o el nombre o correo segun lo requiera
userRouter.get("/verify-user", async (req, res) => {
  const { tokenUser } = req.cookies;
  if (!tokenUser) return res.sendStatus(401);

  jwt.verify(tokenUser, config.jwtSecret, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await service.findOne(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json(userFound);
  });
});



// ruta para enviar correo de recuperacion
userRouter.post("/forgot-password-user", async (req, res, next) => {
  try {
    const  {email} = req.body;
    const send = await service.sendEmailForgot(email);
    res.status(201).json(send);
  } catch (error) {
    next(error);
    return res.status(400).json([error.message]);
  }
});


//actualizar la contraseña por medio de token
userRouter.post("/new-password-user/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const {password} = req.body;
    const user = await service.changePassword(token, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
    return res.status(400).json([error.message]);
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});

module.exports = userRouter;
