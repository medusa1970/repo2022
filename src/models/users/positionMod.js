import mongoose from 'mongoose';
const { Schema } = mongoose;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    abbreviation: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Position', positionSchema);