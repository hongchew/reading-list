import express from 'express';

const database = require("./database")

const app = express();
app.use(express.json())

app.get('/test', (req, res) => {
    res.send({
        success : true
    })
})

app.get('/', (req, res) => {
    res.send(`
        <h1>Test Express Home</h1>
        <p>try out other endpoints on localhost:3001</p>
    `)
})

app.post('/book/details', (req, res) => {
    var book = req.body
    
    database.getDetails(book)
        .then( (details) => {
            res.json(details)
        })
        .catch(e => console.error(e))


})

app.post('/book/comment', (req, res) => {
    var book = req.body.book
    var comment = req.body.comment

    database.addComment(book, comment)
        .then( val => {
            res.json(val)
        })
        .catch(e => console.error(e))
})


app.listen(3001, () =>
  console.log('**** Listening on port 3001 ****'),
);