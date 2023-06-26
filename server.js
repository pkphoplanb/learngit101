const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB =require('./config/connection')

const { readdirSync } = require('fs')

const app = express();

connectDB();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({ limit: '10mb' }))

readdirSync('./routes').map((e) => { 
    app.use('/api', require('./routes/' + e)) 
})

app.listen(5000, () => {
    console.log('Server is Running on port 5000')
})