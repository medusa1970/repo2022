import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true

    },
    last_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    doc_id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    username: {
        type: String,
        trim: true,
        default: null
    },
    password: {
        type: String,
        trim: true,
    },
    recovery_code: {
        type: String,
        default: null,
        trim: true
    },
    state: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'pending', 'blocked', 'deleted'],
        default: 'pending'
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'point', 'production', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hashedPassword = bcryptjs.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

export default mongoose.model('User', userSchema);