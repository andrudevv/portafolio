const Joi = require("joi");

// const customMessages = {
//   "string.empty": "Este campo no puede estar vacío",
//   "string.email": "Debes ingresar una dirección de correo electrónico válida",
//   "any.required": "este campo es obligatorio",
// };
// const id = Joi.number().integer();
const document = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const token = Joi.string();
const municipalityId = Joi.number().integer();
const createuserShema = Joi.object({
  document: document.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  email: email.required(),
  password: password.required(),
  token: token
})

const updateUserShema = Joi.object({
  documentUser: document,
  name: name,
  lastName: lastName,
  phone: phone,
    email: email,
  municipalityId: municipalityId,
  
});


const getUserShema = Joi.object({
  email: email.required(),
});

const loginShema = Joi.object({
  email: email.required(),
  password: password.required(),
});
module.exports ={ createuserShema, updateUserShema, getUserShema, loginShema };
