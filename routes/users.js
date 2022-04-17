const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const { hashPassword, comparePassword } = require('../util/util');

router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json(updatedUser);

        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json({ message: "Not Authorized" });
    }
})


router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                const deleteUser = await User.findByIdAndDelete(req.params.id);
                res.status(200).json(deleteUser);
            } catch (error) {
                res.status(500).json(error);
            }

        } catch (error) {
            res.status(404).json("User not found");
        }
    } else {
        res.status(401).json({ message: "Not Authorized" });
    }
})


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;