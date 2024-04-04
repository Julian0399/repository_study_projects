// Desc: Database connection
import mongoose from 'mongoose';

// Connect to MongoDB
export const connectDB = async() => {
    // si no se puede conectar a la base de datos se muestra un error
    try{
        mongoose.connect('mongodb://localhost/mernbd');
        console.log('Database connected');
    }catch(error){
        console.log(error);
    } 
};
