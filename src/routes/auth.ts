import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
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
    if (!userData) { return console.log('usuario n existe') }

    if (userData) {
        await setTimeout(() => {res.status(200).redirect('/pages/principal')}, 2000)
        return
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
        password: passwordHash
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