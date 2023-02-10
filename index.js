const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')

const formController = require('./controllers/formController')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json())

const db = require('./db')

const port = 5000

app.get('/hello', (req, res) => {
    res.send({code: '200', message: 'hello i am here'})
})

app.post('/signup', formController.signup)


app.post('/login', formController.login)


app.listen(port, () => {
    console.log(`Backend is Running on ${port}`)
})

