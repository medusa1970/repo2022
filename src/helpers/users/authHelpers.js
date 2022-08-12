import User from '../../models/users/userModel.js';
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer';

export const verify_signin = async (req) => {
    const { username, password } = req.body;
    const user = await User.findOne({$or: [{email: username}, {username: username}]}, {_id: 1, type:1, username: 1, password: 1});
    if (!user) { 
        return { message: 'Usuario no encontrado' };
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return { message: 'Contraseña incorrecta' };
    }
    return { user, message: 'Usuario verificado' };
}

export const generateTokens = async (userId, username) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshtoken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: '4h' });
        return { token, refreshtoken, error: null };
    } catch (error) {
        return { error };
    }
}

export const refreshTokens = async (req) => {
    try {
        const {token, refreshtoken, username, type} = req.body;
        if (!token || !refreshtoken) {
            return { error: 'No se encontraron los tokens' };
        }

        const  idToken  = jwt.verify(token, process.env.JWT_SECRET);
        const idRefresh = jwt.verify(refreshtoken, process.env.REFRESH_JWT_SECRET);
        if (idToken.userId !== idRefresh.userId) {
            return { error: 'Tokens no coinciden' };
        }
        const userId = idToken.userId;
        const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

        return { token:newToken, refreshtoken, username, type, error: null };
    } catch (error) {
        return { error: "error" };
    }
}

export const generateCode = (length) => {
    let result           = '';
    const characters       = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const sendEmail = async(email, first_name, recovery_code) => {
    const contentHTML = `
    <h1>Mensaje de Soporte Sii-Pi</h1>
    <p>Hola ${first_name}, utiliza el código de verificación para recuperar tu contraseña</p>
    <h2>${recovery_code}</h2>
    <p>Si no has solicitado un cambio de contrasena, por favor ignora este mensaje</p>`;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de contraseña',
        html: contentHTML
    };
    await transporter.sendMail(mailOptions);
}