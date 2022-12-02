const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tasks: { type: Array }
});

// login users
userSchema.statics.login = async function (email, password) {
    // Validation
    if (!email || !password)
        throw Error("All fields must be filled");

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect email");
    }
    
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
}

// sign up users
userSchema.statics.signup = async function (name, email, password) {

    // Validation
    if (!name || !email || !password)
        throw Error("All fields must be filled");
    if (!validator.isEmail(email))
        throw Error("Email is not valid");
    if (!validator.isStrongPassword(password))
        throw Error("Password not strong enough");

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ name, email, password: hash, tasks: [] });

    return user;
}

// Chack password of user 
userSchema.statics.chackPassword = async function (_id, password) {
    // Validation
    if (!_id || !password)
        throw Error("All fields must be filled");

    const user = await this.findOne({ _id });

    if (!user) {
        throw Error("Incorrect _id");
    }
    
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
}

// Change password of user 
userSchema.statics.changePassword = async function (_id, password) {
    // Validation
    if (!_id || !password)
        throw Error("All fields must be filled");

    if (!validator.isStrongPassword(password))
        throw Error("Password not strong enough");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.updateOne({ _id }, {$set: {password: hash}});

    if (!user) {
        throw Error("Incorrect _id");
    }

    return user;
}

module.exports = mongoose.model("users", userSchema);;