const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

module.exports.getUser = async (req, res) => {
    const email = req.body.email;

    User.findOne({ email })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
};

// login user
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ name: user.name, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// signup user
module.exports.signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.signup(name, email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Check password 
module.exports.checkPassword = async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;

    try {
        const user = await User.chackPassword(_id, password);

        res.status(200).json({true: true})
    }
    catch(err) {
        res.status(400).json({ error: err.message });
    }
}

// Change password
module.exports.changePassword = async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;

    try {
        const user = await User.changePassword(_id, password);

        res.status(200).json({user})
    }
    catch(err) {
        res.status(400).json({ error: err.message });
    }
}