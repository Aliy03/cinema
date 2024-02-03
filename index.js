const express = require('express')
const bodyParser = require('body-parser')
const api = require("./api")
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('static'));
app.use(bodyParser.json())
api(app);

app.listen(8081)
