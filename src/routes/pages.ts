import express, { Request, Response } from 'express'
const session = require('express-session')

const router = express.Router()

const authVerify = (req: any, res: any, next: any) => {
    if (!req.session.authenticated) {
        res.status(401).redirect('/login')
    } else {
        next()
    }
}

router.get('/principal', authVerify, (req: any, res: Response)=> {
    res.render('../views/principal')
})

router.get('/math', authVerify, (req: any, res: Response)=> {
    res.render('../views/math')
})

router.get('/musicas', authVerify, (req: any, res: Response)=> {
    res.render('../views/musicas')
})

router.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});

module.exports = router;