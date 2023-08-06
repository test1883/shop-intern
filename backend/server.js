//for .env
require("dotenv").config()

//package imports
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//routes
const userRoutes = require('./routes/user')
const itemRoutes = require('./routes/items')
const uploadRoutes = require('./routes/upload')

//express app
const app =  express()

//middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/upload", uploadRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/user", userRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        const server = app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch(error => {
        console.log(error)
    })