//se dice como se van a guardar los datos en la base de datos
import mongoose from 'mongoose';
//se crea un esquema de mongoose para guardar los datos en la base de datos
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim : true //quita los espacios en blanco al inicio y al final
    },
    email:{
        type: String,
        required: true,
        unique: true, //no se pueden repetir los correos
        trim : true //quita los espacios en blanco al inicio y al final
    },
    password:{
        type: String,
        required: true
    }
    
},{ //se agrega un timestamp para saber cuando se creo el usuario
    timestamps: true
})

export default mongoose.model('User', userSchema); //se exporta el modelo de usuario