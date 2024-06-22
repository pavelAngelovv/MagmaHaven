const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const identityName = 'email'

async function register(username, email, password) {
    const existingUsername = await User.findOne({ username }); 
    const existingEmail = await User.findOne({ email }); 

    if (existingUsername) {
        throw new Error(`Username is already taken`)
    }

    if (existingEmail) {
        throw new Error(`This email is already in use`)
    }

    const user = new User({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
    })

    await user.save();

    return user;
}

async function login(identity, password) {
    const user = await User.findOne({ [identityName]: identity });

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password`)
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw new Error(`Incorrect ${identityName} or password`)
    }

    return user;
}

module.exports = {
    register,
    login
};