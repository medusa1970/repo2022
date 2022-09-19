import Point from '../../models/points/pointModel.js';


export const pointAll = async (req, res) => {
    try {
        const points = await Point.find({state: {$ne: "deleted"}}, {_id: 1, name:1});
        res.status(200).json({points});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const pointAdd = async (req, res) => {
    try {
        const point = new Point(req.body);
        await point.save();
        res.status(200).json({ error: null, message: 'Punto creado con exito', point });  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: 'Error al crear punto' });
    }
}

export const pointUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const point = await Point.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ error: null, message: 'Punto actualizado con exito', point });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al actualizar punto' });
    }
}

export const pointDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const point = await Point.findByIdAndUpdate(id, {state: "deleted"}, { new: true });
        res.status(200).json({ error: null, message: 'Punto eliminado con exito', point });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al eliminar punto' });
    }
}
