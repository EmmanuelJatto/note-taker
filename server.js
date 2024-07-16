const express = require('express');
const path = require('path');
const fs = require('fs');
let newNote = [];

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    newNote = fs.readFile('/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        } else {
            console.log(data);
        }
    })
    .then((res) => {
        newNote = JSON.parse(newNote);
        res.json(newNote)
    });
});

app.get('/api/notes', (req, res) => {
    newNote = fs.readFile('db/db.json', 'utf-8');
    newNote = JSON.parse(newNote);

    res.json(newNote);
})

app.post('/api/notes', (req, res) => {
    newNote = fs.readFile('./db/db.json', 'utf-8');
    newNote = JSON.parse(newNote);

    req.body.id = newNote.length;
    newNote.push(req.body);
    newNote = JSON.stringify(newNote);

    fs.writeFile('./db/db.json', newNote, (err) => {
        if (err) {
            console.log(err);
        }
    })
    .then(res.json(JSON.parse(newNote)));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);