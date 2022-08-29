import User from '../../models/users/userModel.js';
import TypeUser from '../../models/users/typeUserModel.js';
import Point from '../../models/points/pointModel.js';


export const users = async (req, res) => {
    try {
        //quiero solo los registros donde state sea distinto de leleted

        const users = await User.find({state: {$ne: "deleted"}}, {_id: 1, first_name:1, last_name:1, doc_id:1, phone:1, address:1, username: 1, email:1, type: 1, state: 1});
        const type_users = await TypeUser.find({}, {_id: 1, name: 1});
        const points = await Point.find({}, {_id: 1, name: 1});
        res.status(200).json({users, type_users, points });
    } catch (error) {
        res.status(500).json(error);
    }
}

//list user where state is distint of deleted

export const addUserData = async (req, res) => {
    const { first_name, last_name, doc_id, phone, address } = req.body;
    try {
        const user = new User({ first_name, last_name, doc_id, phone, address });
        await user.save();
        res.status(200).json({ error: null, message: 'Usuario creado con exito', user });  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: 'Error al crear usuario' });
    }
}

export const putUserData = async (req, res) => { console.log(req.body);
    const { _id } = req.params;
    const { email, username, password, state } = req.body;
    //update user
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 404, message: 'Usuario no encontrado' });
        }
        await user.updateOne({ email, username, password, state });
        res.status(200).json({ error: null, message: 'Usuario actualizado con exito' });
    } catch (error) {
        res.status(500).json({ error: error, message: 'No se pudo procesar. ERROR' });
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
