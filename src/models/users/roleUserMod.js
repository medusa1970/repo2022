import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleUserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {type: String },
    point: {type: String, default: ""},
    area: {type: String },
    position: {type: String },
    access: {type: Array },
    routes: {type: Array },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('RoleUser', roleUserSchema);
