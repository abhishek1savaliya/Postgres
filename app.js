const express = require('express')
const app = express()
const morgan = require('morgan')

require('./model/index')
const userController = require('./controller/userController')

const PORT = 5001

app.get('/', (req, res) => {
    res.send("home page")
})

app.use(morgan('tiny'))

app.get('/add', userController.addUser)
app.get('/crud', userController.crud)
app.get('/query', userController.queryData)
app.get('/finder', userController.findData)
app.get('/getset', userController.getSet)
app.get('/validation', userController.validation)
app.get('/rawQuery', userController.rawQuery)

//oneToOne
app.get('/onetoone', userController.oneToOne)
app.get('/belongsto', userController.belongsTo)

//OneToMany
app.get('/onetomany', userController.oneToMany)

//ManyToMany
app.get('/manytomany', userController.manyToMany)

//socpes
app.get('/scopes', userController.scopes)

//polymorphic
app.get('/polymorphic', userController.polymorphic)

//polymorphic-many
app.get('/polymorphicmany', userController.manytomanypolymorphic)

app.listen(PORT, () => {
    console.log("SERVER is running on PORT 5001")
})