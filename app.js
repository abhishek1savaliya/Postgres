const express = require('express')
const app = express()

require('./model/index')
const userController = require('./controller/userController')

const PORT = 5001

app.get('/', (req, res) => {
    res.send("home page")
})

app.get('/add', userController.addUser)

app.listen(PORT, () => {
    console.log("SERVER is running on PORT 5001")
})