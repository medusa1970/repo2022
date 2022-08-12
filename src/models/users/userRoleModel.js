const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    abbreviation: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
    },
    roles: [{
        rolId: ObjectId,
        name: {
            type: String,
            required: true,
        },
        abbreviation: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: true,
        },
        state: {   
            type: Number,
            required: true,
            default: 0
        }
    }],
    access: [{
        accessId: ObjectId,
        name: {
            type: String,
            required: true,
        },
        abbreviation: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: true,
        },
        state: {   
            type: Number,
            required: true,
            default: 0
        },
        routes: [{
            routeId: ObjectId,
            route: {
                type: String,
                required: true,
            },
            detail: {
                type: String,
            },
            state: {
                type: Number,
                required: true,
                default: 0
            }
        }],
    }],
    state: {
        type: Number,
        required: true,
        default: 0
    },
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Role', roleSchema);