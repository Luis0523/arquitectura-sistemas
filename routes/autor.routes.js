const express = require('express')
const router = express.Router()
const autorController = require('../controllers/autor.controller')


router.get('/autores', autorController.getAutores)
router.get('./autores/:id', autorController.getAutorById)


exports.module = router