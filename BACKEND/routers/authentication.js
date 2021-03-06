const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post(`/register`, async (req, res) => {
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

router.post(`/login`, async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('User not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {
                expiresIn: '1d'
            }
        )
        res.status(200).send({
            user: user.email,
            token: token
        })
    } else {
        res.status(400).send('Invalid password');
    }
})

module.exports = router;