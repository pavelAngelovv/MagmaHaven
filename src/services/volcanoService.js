const { Volcano } = require("../models/Volcano");

// TODO replace with real data service according to exam description

async function getAll() {
    return Volcano.find().lean();
}

async function getById(id) {
    return Volcano.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Volcano({
        name: data.name,
        location: data.location,
        elevation: data.elevation,
        lastEruption: data.lastEruption,
        image: data.image,
        typeVolcano: data.typeVolcano,
        description: data.description,
        owner: authorId
    });

    await record.save();

    return record;
}

async function update(id, data, userId) {
    const record = await Volcano.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found ' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied');
    }

    // TODO replace with real properties
    record.name = data.name,
    record.location = data.location,
    record.elevation = data.elevation,
    record.lastEruption = data.lastEruption,
    record.image = data.image,
    record.typeVolcano = data.typeVolcano,
    record.description = data.description,

    await record.save();

    return record;
}

async function deleteById(id, userId) {
    const record = await Volcano.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found ' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied');
    }

    await Volcano.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}

