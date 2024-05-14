import express, { NextFunction, Request, Response } from 'express'
import { userList, login, logout, register, deleteUser,  } from '../controllers/auth';
const bodyParser = require('body-parser');
require('dotenv').config();

const router = express.Router()

// Middlewares
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', login)

router.get('/logout', logout);

router.post('/register', register)

router.delete('/register', deleteUser)

router.get('/userlist', userList);

module.exports = router