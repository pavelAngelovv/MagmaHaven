const { Schema, model, Types } = require('mongoose')

// TODO replace with data model from exam description 

const dataSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    elevation: {
        type: Number,
        required: true,
    },
    lastEruption: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    typeVolcano: {
        type: String,
        required: true,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
    },
    description: {
        type: String,
        required: true,
    },
    voteList: {
        type:  [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type:  Types.ObjectId,
        ref: 'User'  
    }
});

const Data = model('data', dataSchema);

module.exports = { Data };
