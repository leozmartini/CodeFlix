import express, { Request, Response } from 'express'
const { isAuthenticated, getUserType } = require('../tokenVerify') 

const router = express.Router()


router.get('/principal', isAuthenticated, (req: any, res: Response)=> {
    res.render('principal')
})

router.get('/math', isAuthenticated, (req: any, res: Response)=> {
    res.render('math')
})

router.get('/musicas', isAuthenticated, (req: any, res: Response)=> {
    res.render('musicas')
})

router.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});

module.exports = router;