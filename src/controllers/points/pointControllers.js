import Point from '../../models/points/pointModel.js';


export const points = async (req, res) => {
    const points = await Point.find();
    res.json({points});
}

export const addPoint = async (req, res) => {
    const { name, address, abbreviation, phone, state } = req.body;
    const newPoint = new Point({ name, abbreviation, address, phone, state });
    const point = await newPoint.save();
    res.json(point);
}

export const updatePoint = async (req, res) => {
    const { name, address, phone, state } = req.body;
    const { id } = req.params;
    const point = await Point.findByIdAndUpdate(id, { name, address, phone, state }, { new: true });
    res.json(point);
}

export const deletePoint = async (req, res) => {
    const { id } = req.params;
    const point = await Point.findByIdAndDelete(id);
    res.json(point);
}
