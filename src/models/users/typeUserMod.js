import mongoose from 'mongoose';
const { Schema } = mongoose;

const typeUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    abbreviation: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
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

export default mongoose.model('TypeUser', typeUserSchema);