const express = require('express');
require('dotenv').config();

const sequelize = require('./db/db')
const autorRoutes = require ('./routes/autor.routes')
const AutorModel = require('./models/autor.model')

const app = express()
app.use(express.json())