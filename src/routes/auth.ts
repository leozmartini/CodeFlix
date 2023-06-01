import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import { getDate } from '../getDate'
const bcrypt = require('bcrypt')
require('dotenv').config();

const router = express.Router()
const admin = process.env.MONGO_PASS
const User = require('../models/User')

// JSON response 
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    // validations 
    if (!username || !password) return

    const userData = await User.findOne({ username: username })
    if (!userData) { console.log('usuario nao existe'); return res.status(401).redirect('/login') }

    if (userData) {
        userData.lastLogin = getDate()
        await userData.save()
        .then(() => {
            // setTimeout(() => {res.status(200).redirect('/pages/principal')}, 2000)
            res.send('logado')
            return
        })
        .catch((error: any) => { console.log(`Erro ao salvar lastLogin: ${error}`)})

    }
    // PRECISA VERIFICAR SENHA E EXIBIR NO HTML SE FOI LOGADO CERTO + ADD JWT TOKEN

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