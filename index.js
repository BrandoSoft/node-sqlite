const express = require('express');
const lessons = require('./models/dbhelpers');

const server = express();

server.use(express.json());

const PORT = 5000;

server.get('/', (req, res) => {
    res.json({ message: "Iam son of Hal and always watching" })
});

server.post('/api/lessons', (req, res) => {
    lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson)
        })
        .catch(error => {
            res.status(500).json({ message: "cannot add lesson" })
        })
})

server.get('/api/lessons', (req, res) => {
    lessons.find()
        .then(lessons => {
            res.status(200).json(lessons)
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wronk, unable to retrieve lessons" })
        })
})

server.get('/api/lessons/:id', (req, res) => {
    const { id } = req.params;

    lessons.findById(id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson)
            } else {
                res.status(404).json({ message: "Unable to find lesson with this ID" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to perform operation" })
        })
})

server.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params;

    lessons.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Successfully removed" })
            } else {
                res.status(404).json({ message: "Unable to find record" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to delete" })
        })
})

server.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    lessons.update(id, changes)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson)
            } else {
                res.status(404).json({ message: 'Record not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating record' })
        })
})
server.listen(PORT, () => {
    console.log(`\n*** Server Runing on port ${PORT} ***\n`)
});