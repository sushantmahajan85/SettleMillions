const express = require('express');
const fs = require('fs');
const User = require('../schema/models/User');

// const userData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/userData.json`));

// const Update = require('./../app');

exports.getAllUsers = async (req, res) => {
    // console.log(req.requestTime);
    try {
        const users = await User.find();
        // const updates = await Update.find();
        // console.log(req.headers);
        res.status(200).json({
            status: 'success',
            // requestedAt: req.requestTime,
            data: {
                users
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};
