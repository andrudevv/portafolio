const Joi = require("joi");

const url = Joi.string();
const img = Joi.string();
const id = Joi.string().pattern(/^[a-zA-Z0-9]+$/).messages({
  'string.empty': 'El ID no puede estar vacío.',
  'string.pattern.base': 'El ID solo puede contener letras y números.',
  'any.required': 'El ID es un campo obligatorio.'
});;


const createNetworkShema = Joi.object({
  url: url.required(),
  img: img.required()
})



const getNetworkShemaId = Joi.object({
  id: id.required(),
});


const getAndUpdateNetworkShema = Joi.object({
  url: url,
  img: img
  
});

module.exports ={ createNetworkShema, getNetworkShemaId, getAndUpdateNetworkShema };
