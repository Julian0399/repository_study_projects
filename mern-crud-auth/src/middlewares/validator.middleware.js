// Desc: Validator middleware
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // compara el body de la petición con el esquema de validación
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json(error.errors.map((error) => error.message)); // retorna un error 400 con los mensajes de error no con el error completo
  }
};
