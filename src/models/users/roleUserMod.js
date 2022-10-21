import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleUserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idType: {type: String },
    idPoint: {type: String },
    idArea: {type: String },
    idPosition: {type: String },
    access: {type: Array },
    routes: {type: Array },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('RoleUser', roleUserSchema);


/* import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleUserSchema = new Schema({
    idType: {type: String },
    idPoint: {type: String },
    area: {
        idArea: {type: String },
        idPosition: {type: String },
        access: [{
            idAccess: {type: String },
            routes: [{
                idRoute: {type: String },
            }],
        }],    
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Role', roleUserSchema); */