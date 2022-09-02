import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleSchema = new Schema({
    //vincular con modelo User
    name: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'point', 'production', 'admin'],
        default: 'user'
    },
    icon: {
        type: String,
    },
    access: [{
        name: {
            type: String,
        },
        links: [{
            name: {
                type: String,
            },
            icon: {
                type: String,
            },        
            route: {
                type: String,
            },
        }],
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Role', roleSchema);