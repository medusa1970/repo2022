import mongoose from 'mongoose';
const { Schema } = mongoose;

const pointSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true

    },
    abbreviation: {
        type: String,
        required: true,
    },
    address: {
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
    state: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Point', pointSchema);