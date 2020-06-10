const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const auth = require("./../middleware/auth");
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer();


router.post('/editSite/:id', upload.single('image'),  async function (req, res) {
    console.log(req.params.id, '--')
    console.log(req.body, '--body')

    const updates = Object.keys(req.body).filter(i=>req.body[i] !== null).filter(el=>el!=='image');
    console.log(updates)
    const allowedUpdates = ['link', 'text', 'dev'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try{
        const site = await Site.findOne({ _id: mongoose.Types.ObjectId(req.params.id)});
        updates.forEach((update) =>  site[update] = req.body[update]);
        if(req.file)site.image = req.file.buffer
        await site.save();
        res.send(200)
    }catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

});

router.put('/user/edit', auth, async(req, res) => {
    const updates = Object.keys(req.body).filter(i=>req.body[i] !== null);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.user.id);

        updates.forEach((update) => user[update] = req.body[update]);

        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
