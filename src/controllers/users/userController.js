import User from '../../models/users/userModel.js';
import TypeUser from '../../models/users/typeUserModel.js';
import Point from '../../models/points/pointModel.js';


export const users = async (req, res) => {
    try {
        const users = await User.find({}, {_id: 1, first_name:1, last_name:1, username: 1, type: 1, state: 1});
        const type_users = await TypeUser.find({}, {_id: 1, name: 1});
        const points = await Point.find({}, {_id: 1, name: 1});
        res.status(200).json({users, type_users, points });
    } catch (error) {
        res.status(500).json(error);
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
