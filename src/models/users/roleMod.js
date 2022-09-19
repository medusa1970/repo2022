import mongoose from 'mongoose';
const { Schema } = mongoose;

const roleSchema = new Schema({
    type: {
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
        icon: {
            type: String,
            required: true,
        },
    },
    area: [{
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        abbreviation: {
            type: String,
        },
        icon: {
            type: String,
        },
        position: [{
            name: {
                type: String,
            },
            description: {
                type: String,
            },
            abbreviation: {
                type: String,
            },
            icon: {
                type: String,
            },
        }],
        access: [{
            name: {
                type: String,
            },
            description: {
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
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Role', roleSchema);