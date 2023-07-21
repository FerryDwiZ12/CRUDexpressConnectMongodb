const express = require('express')
const router = express.Router()
const users = require('../models/users')

router.post('/addUser', (req, res) => {
    const user = new users({
        nama : req.body.nama,
        umur : req.body.umur,
        email : req.body.email,
        password : req.body.password,
    })

    try {
        const usersToSave = user.save()
        res.status(200).json(usersToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/user', async (req, res)=>{
    try {
        const user = await users.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/user/:id', async (req, res)=> {
    try {
        const user = await users.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUserData = await users.findByIdAndDelete(id)
        res.send(`user with ${deleteUserData.nama} has been delected..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


router.put('/update/:id', async (req, res)=> {
    try {
        const id = req.params.id
        const updateUserData = req.body;
        const options = {new: true};

        const result = await users.findByIdAndUpdate(
            id, updateUserData, options
        )

        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;