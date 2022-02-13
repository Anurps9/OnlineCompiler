const express = require('express')
const router = express.Router()
const Room = require('../models/room')

router.use(express.json())

router
.get('/', (req, res) => {
    Room.find({}, (err, room) => {
        catchError(err, res)
        res.status(200).json(room)
    })
})
.get('/:id', (req, res) => {
    Room.findOne({id: req.params.id}, (err, room) => {
        catchError(err, res)
        res.status(200).json(room)
    })
})
.post('/', (req, res) => {
    Room.findOne({id: req.body.id}, (err, room) => {
        catchError(err, res)
        if(room){
            res.status(200).json(null)
            return;
        }
        const newRoom = new Room(req.body)
        newRoom.save((err, room) => {
            catchError(err, res)
            res.status(200).json(newRoom)
        })
    })
})
.put('/:id', (req, res) => {
    Room.findOne({id: req.params.id}, (err, room) => {
        catchError(err, res)
        if(!room){
            res.status(200).json(null)
            return;
        }
        room.replaceOne(req.body, (err, result) => {
            catchError(err, res)
            res.status(200).json(result)
        })
     })
})
.patch('/:id', (req, res) => {
    Room.findOne({id: req.params.id}, (err, room) => {
        catchError(err, res)
        if(!room){
            res.status(200).json(null)
            return;
        }
        room.updateOne(req.body, (err, result) => {
            catchError(err, res)
            res.status(200).json(result)
        })
     })
})
.delete('/:id', (req, res) => {
    Room.deleteOne({id: req.params.id}, (err, result) => {
        catchError(err, res)
        res.status(200).json(result)
    })
})
.delete('/', (req, res) => {
    Room.deleteMany({}, (err, result) => {
        catchError(err, res)
        res.status(200).json(result)
    })
})

const catchError = (err, res) => {
    if(err){
        res.sendStatus(500)
        throw err;
    }
}

module.exports = router;
