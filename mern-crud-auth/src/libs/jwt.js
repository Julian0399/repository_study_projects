import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccesToken(payload) {
  //se crea un token para el usuario
  // new promise es un objeto que representa la terminación o el fracaso de una operación asíncrona
  return new Promise((resolve, reject) => {
    //se crea un token para el usuario
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
