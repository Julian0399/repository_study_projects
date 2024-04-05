import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  //se obtienen los datos del usuario
  const { username, email, password } = req.body;
  //se crea un nuevo usuario con los datos obtenidos
  try {
    const userFound = await User.findOne({ email })
    if (userFound) 
      return res.status(400).json(["El email ya esta en uso"]);
    //se encripta la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    //se crea un nuevo usuario con los datos obtenidos
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    //se guarda el usuario en la base de datos y se envia la respuesta al cliente
    const userSaved = await newUser.save();
    //se crea un token para el usuario
    const token = await createAccesToken({ id: userSaved._id });
    //se envia el token al cliente
    res.cookie("token", token);
    res.json({
      _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateaAt: userSaved.updateaAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const login = async (req, res) => {
  //se obtienen los datos del usuario
  const { email, password } = req.body;
  //se crea un nuevo usuario con los datos obtenidos
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    //se compara la contraseña encriptada compare devuelve un booleano
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    //se crea un token para el usuario
    const token = await createAccesToken({ id: userFound._id });
    //se envia el token al cliente
    res.cookie("token", token);
    res.json({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateaAt: userFound.updateaAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logout" });
};

export const profile = async (req, res) => {
  //se obtiene el usuario por el id del token 
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });
  return res.json({
    _id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateaAt: userFound.updateaAt,
  });
};
