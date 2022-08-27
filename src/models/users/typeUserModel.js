import mongoose from 'mongoose';
const { Schema } = mongoose;

const typeUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true

    },
    description: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('TypeUser', typeUserSchema);