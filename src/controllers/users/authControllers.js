import User from '../../models/users/userModel.js';
import { verify_signin, generateTokens, generateCode, sendEmail, refreshTokens } from '../../helpers/users/authHelpers.js';
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { first_name, last_name, doc_id, phone, address, email, username, password } = req.body;
    try {
        const user = new User({ first_name, last_name, doc_id, phone, address, email, username, password });
        await user.save();
        res.status(200).json({ error: null, message: 'Usuario creado con exito' });  
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al crear usuario' });
    }
}

export const signin = async (req, res) => {
    const {user, message} = await verify_signin(req);
    if (user===undefined) {
        return res.status(400).json({ error: 400, message });
    }
    const data = await generateTokens(user.id, user.username);
    if (data.error) {
        return res.status(500).json({ error: 500, message: data.error });
    }
    const {token, refreshtoken, error} = data;
    res.status(200).json({ token, refreshtoken, username:user.username, type: user.type, error });
}

export const refresh = async (req, res) => {
    const data = await refreshTokens(req);
    if (data.error) {
        return res.status(500).json({ error: 500, message: data.error });
    }
    const {token, refreshtoken, username, type, error} = data;
    res.status(200).json({ token, refreshtoken, username, type, error });
}

export const recover = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 404, message: 'Usuario no encontrado' });
        }
        const recovery_code = await generateCode(8);
        await user.updateOne({ recovery_code });
        const recover_token = jwt.sign({ _id: user._id }, process.env.RECOVER_JWT_SECRET, { expiresIn: "60m" });
        await sendEmail(user.email, user.first_name, recovery_code);
        res.status(200).json({ error: null, message: 'El código de recuperación fue enviado a tu email', recover_token });

    } catch (error) {
        res.status(500).json({ error: error, message: 'No se pudo procesar. ERROR' });
    }
}

export const change = async (req, res) => {
    const { recovery_code, password, match_password, recover_token } = req.body;
    try {
        const {_id} = jwt.verify(recover_token, process.env.RECOVER_JWT_SECRET);
        const user = await User.findOne({ _id, recovery_code });
        if (!user) {
            return res.status(404).json({ error: 404, message: 'Usuario no encontrado' });
        }
        if (password !== match_password) {
            return res.status(400).json({ error: 400, message: 'Las contraseñas no coinciden' });
        }
        const new_password = await bcryptjs.hash(password, 10);
        await user.updateOne({ password: new_password });
        res.status(200).json({ error: null, message: 'Contraseña cambiada con exito' });
    } catch (error) {
        res.status(500).json({ error: error, message: 'No se pudo procesar. ERROR' });
    }
}

export const profile = async (req, res) => {
    console.log("profile sii-pi");
}

export const uploadFile = async (req, res) => {
    console.log("upload sii-pi");
    console.log(JSON.stringify(req.body));
    res.json(req.body);
}
