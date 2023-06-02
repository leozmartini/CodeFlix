import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import { getDate } from '../getDate'
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config();

const router = express.Router()
const admin = process.env.MONGO_PASS
const User = require('../models/User')

// JSON response 
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true
}));

router.post('/login', async (req: any, res: Response) => {
    const { username, password } = req.body

    // validations 
    if (!username || !password) return

    const userData = await User.findOne({ username: username })
    if (!userData) return res.send('404')

    // password verify
    const hash = userData.password

    res.send(await bcrypt.compare(password, hash).then((x: Boolean) => { return x })?'202' : '401') // comparação ternária.

    // logado

    userData.lastLogin = getDate()
    await userData.save()
    .then(() => {
        console.log('lastLogin atualizado')
    })
    .catch((error: any) => { console.log(`Erro ao salvar lastLogin: ${error}`)})

})

router.post('/register', async (req: Request, res: Response) => {
    const { adminKey, username, password } = req.body

    // validations
    if (Object.keys(req.body).length === 0) { return res.status(204) } // 204 = No content
    if (!username || !password) { return res.status(422).json({ msg: 'Existem dados de login faltando.' }) }
    if (!admin || adminKey != admin) { return res.status(422).json({ msg: 'Chave admin inválida.' }) }

    const userExists = await User.findOne({ username: username })
    if (userExists && password != 'delete') { return res.status(409).json({ msg: 'Usuário já cadastrado.' }) }

    // delete user (se o usuario for existente e a senha digitado for 'delete')
    if (password == 'delete') {
        try {
            await User.deleteOne({ username: username })
            res.status(202).json({ msg: `Usuário ${username} deletado.` })
            return
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar usuário (500)" })
            console.log(`Erro ao deletar usuário: ${error}`)
        }
    }

    // bcrypt
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        adminKey,
        username,
        password: passwordHash,
        lastLogin: getDate()
    })

    try {
        await user.save()
        res.status(201).json({ msg: "usuario criado" })
    } catch (error) {
        res.status(500).json({ msg: "Erro ao criar usuário (500)" })
        console.log(`Erro ao criar usuário: ${error}`)
    }

})

module.exports = router;