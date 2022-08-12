import mongoose from 'mongoose';

try {
    mongoose.connect(process.env.DB_CONNECT);
    console.log('Conectado a base de datos');
} catch (error) {
    handleError(error);
    console.log('Error conectando a base de datos' + error);
}