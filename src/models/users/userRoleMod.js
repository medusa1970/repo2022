import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleSchema = new Schema({
    //vincular con modelo User
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true
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