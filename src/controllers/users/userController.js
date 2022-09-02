import User from '../../models/users/userModel.js';
import Role from '../../models/users/roleMod.js';
import TypeUser from '../../models/users/typeUserMod.js';
import Position from '../../models/users/positionMod.js';
import Point from '../../models/points/pointModel.js';
import bcryptjs from 'bcryptjs';


export const users = async (req, res) => {
    try {
        const users = await User.find({state: {$ne: "deleted"}}, {_id: 1, first_name:1, last_name:1, doc_id:1, phone:1, address:1, username: 1, email:1, type: 1, state: 1});
        const type_users = await TypeUser.find({}, {_id: 1, name: 1});
        const points = await Point.find({}, {_id: 1, name: 1});
        const positions = await Position.find({}, {_id: 1, name: 1});
        res.status(200).json({users, type_users, points, positions });
    } catch (error) {
        res.status(500).json(error);
    }
}

//list user where state is distint of deleted

export const addUserData = async (req, res) => {
    try {
        const user = new User(req.body);
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        await user.save();
        res.status(200).json({ error: null, message: 'Usuario creado con exito', user });  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: 'Error al crear usuario' });
    }
}

export const putUserData = async (req, res) => {
    const { _id } = req.params;
    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);
    //update user
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({ error: null, message: 'Usuario actualizado con exito', user });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar usuario' });
    }
}
export const addRole = async (req, res) => {
    const { save_in, position, abbreviation } = req.body;
    try {
        const role = new Role({position: {name: position, abbreviation: abbreviation}});
        await role.save();
        console.log(role);
        res.status(200).json({ error: null, message: 'Rol creado con exito', role });  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: 'Error al crear rol' });
    }
}


//tipos de usuarios
export const typeUser = async (req, res) => {
    // get type users
    const typeUsers = await TypeUser.find({}, {_id: 1, label: 1, value: 1});
    res.json(typeUsers);
}

export const addTypeUser = async (req, res) => {
    const { name, description } = req.body;
    const newTypeUser = new TypeUser({ name, description });
    const typeUser = await newTypeUser.save();
    res.json(typeUser);
}

export const updateTypeUser = async (req, res) => {
    const { label, value } = req.body;
    const { id } = req.params;
    const typeUser = await TypeUser.findByIdAndUpdate(id, { label, value }, { new: true });
    res.json(typeUser);
}

export const positionGet = async (req, res) => {
    const position = await Position.find({}, {_id: 1, name: 1});
    res.json(position);
}

export const positionPost = async (req, res) => {
    try {
        const newPosition = new Position(req.body);
        await newPosition.save();
        const positions = await Position.find({}, {_id: 1, name: 1}, { new: true });
        res.status(200).json({ error: null, message: 'Posicion creada con exito', positions });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error, message: 'Error al crear posicion' });
        }
}

