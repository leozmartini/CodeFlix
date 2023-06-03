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
    if (!userData) return res.json({"statusLogin": "404"})

    // password verify
    const hash = userData.password

    // res.send(await bcrypt.compare(password, hash).then((x: Boolean) => { return x })?'202' : '401') // comparação ternária.
    let auth
    await bcrypt.compare(password, hash).then((x: Boolean) => { auth = x })

    if (auth) {
        // exports perm
        let perm = userData.perm
    

        // update lasLogin
        userData.lastLogin = getDate()
        await userData.save()
        .then(() => {
            console.log('lastLogin atualizado')
        })
        .catch((error: any) => { console.log(`Erro ao salvar lastLogin: ${error}`)})
        
        // start session

        // response
        res.json({
            "statusLogin": "202",
            "redirect": "/pages/principal"
        })

    } else {
        res.json({"statusLogin": "401"})
    }


})

router.post('/register', async (req: Request, res: Response) => {
    const { adminKey, username, perm, password } = req.body

    // validations
    if (Object.keys(req.body).length === 0) { return res.status(204) } // 204 = No content
    if (!admin || adminKey != admin) { return res.status(422).json({ response: 'Chave admin inválida.' }) }
    if (username && password == 'delete') { deleteUser(); return } // aqui "perm" não é necessária pra deletar user 
    if (!username || !password || !perm) { return res.status(422).json({ response: 'Existem dados de login faltando.' }) }
    if (typeof perm != 'number') { return res.status(422).json({ response: `a chave 'perm' precisa ser um número.` }) }

    const userExists = await User.findOne({ username: username })
    if (userExists && password != 'delete') { return res.status(409).json({ response: 'Usuário já cadastrado.' }) }

    // bcrypt
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        username,
        password: passwordHash,
        perm: perm,
        lastLogin: getDate()
    })

    try {
        await user.save()
        res.status(201).json({ response: "usuario criado" })
    } catch (error) {
        res.status(500).json({ response: "Erro ao criar usuário (500)" })
        console.log(`Erro ao criar usuário: ${error}`)
    }

    // Delete user function
    async function deleteUser() {
        try {
            await User.deleteOne({ username: username })
            return res.status(202).json({ response: `Usuário ${username} deletado.` })
        } catch (error) {
            console.log(`Erro ao deletar usuário: ${error}`)
            return res.status(500).json({ response: "Erro ao deletar usuário" })
        }
    }

})

module.exports = router