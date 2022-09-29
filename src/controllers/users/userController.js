import User from '../../models/users/userModel.js';
import Role from '../../models/users/roleMod.js';
import Point from '../../models/points/pointModel.js';
import bcryptjs from 'bcryptjs';


export const users = async (req, res) => {
    try {
        const users = await User.find({state: {$ne: "deleted"}}, {_id: 1, first_name:1, last_name:1, doc_id:1, phone:1, address:1, username: 1, email:1, type: 1, state: 1});
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        const points = await Point.find({}, {_id: 1, name: 1});
        res.status(200).json({users, roles, points});
    } catch (error) {
        res.status(500).json(error);
    }
}

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

//Roles de usuario
export const roleAdd = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        res.status(200).json({ error: null, message: 'Rol creado con exito', roles });  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: 'Error al crear rol' });
    }
}

export const roleAll = async (req, res) => {
    try {
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        res.status(200).json({roles});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const roleUpdate = async (req, res) => { console.log(req.body);
    const { _id } = req.params;
    try {
        //add new area in role
        const role = await Role.findByIdAndUpdate(_id, {$push: {area: req.body.area}}, { new: true });
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', role });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar rol' });
    }
}

export const roleDelete = async (req, res) => {
    const { _id } = req.params;
    console.log(req.body._id);
    try {
        //delete area in role $in _id
        const role = await Role.findByIdAndUpdate(_id, {$pull: {area: {_id: req.body._id}}}, { new: true });
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', role });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al eliminar rol' });
    }
}

export const createAreaInRole = async (req, res) => {
    const { _id } = req.params;
    try {
        //add new area in role
        await Role.findByIdAndUpdate(_id, {$push: {area: req.body}}, { new: true });
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', roles });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar rol' });
    }
}
export const createPositionAreaInRole = async (req, res) => {
    const { idType, idArea } = req.params;
    //create position in area
    try {
        await Role.updateOne({_id: idType, "area._id": idArea}, {$push: {"area.$.position": req.body}});
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', roles });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar rol' });
    }
}     
export const createAccessAreaInRole = async (req, res) => { console.log(req.body); console.log("llegooooooo");
    const { idType, idArea } = req.params;
    //create position in area
    try {
        await Role.updateOne({_id: idType, "area._id": idArea}, {$push: {"area.$.access": req.body}});
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', roles });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar rol' });
    }
}

export const createRouteAccessAreaInRole = async (req, res) => {
    console.log(req.body); console.log(req.params);
    const { idType, idArea, idAccess } = req.params;
    //create position in area
    try {
        await Role.updateOne({_id: idType, "area._id": idArea, "area.access._id": idAccess}, {$push: {"area.$.access.$.route": req.body}});
        const roles = await Role.find({}, {_id: 1, type: 1, area: 1});
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', roles });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar rol' });
    }
}


export const UpdateareaInRole = async (req, res) => {
    const { _id } = req.params;
    try {
        //update area in role
        const role = await Role.findOneAndUpdate({_id: _id, "area._id": req.body.area._id}, {$set: {"area.$": req.body.area}}, { new: true });
        res.status(200).json({ error: null, message: 'Rol actualizado con exito', role });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar rol' });
    }
}