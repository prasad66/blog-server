const router = require('express').Router();
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../util/util');

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email: email });
    const usernameExists = await User.findOne({ username: username });
    console.log(emailExists, usernameExists);
    if (emailExists) {
        res.status(400).json({ msg: "Email already exists", code: "email" });
        return ;
    }

    if (usernameExists) {
        res.status(400).json({ msg: "Username already exists", code: "username" });
        return ;
    }

    const hashedPassword = await hashPassword(password);
    try {
        const newUser = new User({ username, email, password: hashedPassword });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(404).json({ message: "Wrong Credentials" });
            return;
        }

        const isMatch = await comparePassword(req.body.password, user.password);

        if (!isMatch) {
            res.status(404).json({ message: "Wrong Credentials" });
            return;
        }

        const { password, ...others } = user._doc;

        res.status(200).json(others);


    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;