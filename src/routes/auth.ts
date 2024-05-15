import express from 'express';
import { deleteUser, login, logout, register, userList, } from '../controllers/auth';
const bodyParser = require('body-parser');
require('dotenv').config();

const router = express.Router()

// Middlewares
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/logout', logout);
router.get('/userlist', userList);
router.post('/login', login)
router.post('/register', register)
router.delete('/register', deleteUser)

module.exports = router