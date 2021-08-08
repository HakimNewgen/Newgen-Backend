const express = require('express')
const router = express.Router()
const {  ensureGuest } = require('../middleware/auth')

//const Story = require('../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get('/',  (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/manage',  async (req, res) => {
    try {
       // const stories = await Story.find({ user: req.user.id }).lean()
        res.render('manage', {
            name: req.user.firstName,
           
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router