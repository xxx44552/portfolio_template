const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const auth = require("./../middleware/auth");
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer();


router.post('/editSite/:id', auth, upload.single('image'),  async function (req, res) {

    console.log(req.body)

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

module.exports = router;
