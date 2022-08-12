import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type_user: {
        type: Number,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    access: [{
        name: {
            type: String,
            required: true,
        },
        links: [{
            name: {
                type: String,
                required: true,
            },
            route: {
                type: String,
                required: true,
            },
        }],
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Role', roleSchema);