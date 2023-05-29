import express, { Request, Response } from 'express'
require('dotenv').config();

const router = express.Router()
const admin = process.env.MONGO_PASS

// JSON response 
router.use(express.json())

router.post('/register', async(req: Request, res: Response)=> {
    const { adminKey, username, password } = req.body

    // validations

    if(!username || !password) { return res.status(422).json({ msg: 'Existem dados de login faltando!' }) }
    if(!admin || adminKey != admin) { return res.status(422).json({ msg: 'Chave admin inválida.' }) }


})

module.exports = router;