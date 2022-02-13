const express = require('express')
const router = express.Router()
const Problem = require('../models/problem')
const multer = require('multer')

router.use(express.json())

const upload = multer({storage: multer.memoryStorage()})

router
.get('/', (req, res) => {
    Problem.find({}, (err, problem) => {
        catchError(err, res)
        res.status(200).json(problem)
    })
})
.get('/:id', (req, res) => {
    Problem.findOne({_id: req.params.id}, (err, problem) => {
        catchError(err, res)
        res.status(200).json(problem)
    })
})
.post('/', upload.array('testFile'), (req, res) => {
    Problem.findOne({title: req.body.title}, (err, problem) => {
        catchError(err, res)
        if(problem){
            res.status(200).send("Problem already exists")
            return;
        }
        const testInput = Buffer.from(req.files[0].buffer).toString("utf-8")
        const testOutput = Buffer.from(req.files[1].buffer).toString("utf-8")
        const newProblem = new Problem({
            ...req.body,
            testInput: testInput,
            testOutput: testOutput
        })
        newProblem.save((err, problem) => {
            catchError(err, res)
            res.status(200).send("Problem Saved");
        })
    })
})
.put('/:id', (req, res) => {
    Problem.findOne({id: req.params.id}, (err, problem) => {
        catchError(err, res)
        if(!problem){
            res.status(200).json(null)
            return;
        }
        problem.replaceOne(req.body, (err, result) => {
            catchError(err, res)
            res.status(200).json(result)
        })
     })
})
.patch('/:id', (req, res) => {
    Problem.findOne({id: req.params.id}, (err, problem) => {
        catchError(err, res)
        if(!problem){
            res.status(200).json(null)
            return;
        }
        problem.updateOne(req.body, (err, result) => {
            catchError(err, res)
            res.status(200).json(result)
        })
     })
})
.delete('/:id', (req, res) => {
    Problem.deleteOne({id: req.params.id}, (err, result) => {
        catchError(err, res)
        res.status(200).json(result)
    })
})
.delete('/', (req, res) => {
    Problem.deleteMany({}, (err, result) => {
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
