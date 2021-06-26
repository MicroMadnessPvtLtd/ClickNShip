const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({success:false});
    }
    res.send(userList);
})

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({success: false, message:'The User does not exist'});
    }
    res.status(200).send(user);
})

router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments((count) => count);
    
    if (!userCount) {
        return res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
})

router.post(`/`, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
    });

    user = await user.save();

    if (!user) {
        return res.status(404).send('The User was not created');
    }

    res.send(user);
})

router.put(`/:id`, async (req, res) => {
    const userExist = await User.findById(req.params.id);

    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
    }, { new: true });

    if (!user) {
        return res.status(404).send('The User was not updated');
    }

    res.send(user);
})

router.delete(`/:id`, async (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            res.status(200).json({success: true, message: 'User deleted successfully'});
        } else {
            res.status(404).json({success: false, message: 'The User was not found'});
        }
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({success: false, error: err});
    });
})


module.exports = router;