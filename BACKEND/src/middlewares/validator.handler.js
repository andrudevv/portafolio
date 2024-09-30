
function validatorHandler(schema, property) {
    return (req,res,next) =>{
        const data = req[property]; 
        const { error }= schema.validate(data, { abortEarly: false});
        if (error) {
            const validationErrors = error.details.map((detail) => detail.message);
            return res.status(400).json(validationErrors);
          }
        next();
    }
    
}

  
module.exports =  {validatorHandler} ;