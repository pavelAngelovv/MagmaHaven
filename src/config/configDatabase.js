const mongoose = require('mongoose');
require('../models/User');
require('../models/Volcano'); //TODO import real data model

async function configDatabase() {
    //TODO set database name
    const connectionsString = 'mongodb://localhost:27017/magma-haven'

    mongoose.connect(connectionsString);

    console.log('Database connected');
}

module.exports = { configDatabase };