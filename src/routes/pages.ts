import express, { Request, Response } from 'express'
const { isAuthenticated, getUserType } = require('../tokenVerify') 
const path = require('path')

const router = express.Router()


router.get('/principal', isAuthenticated, (req: any, res: Response)=> {
    res.render('principal')
})

router.get('/relevantes', isAuthenticated, async (req: any, res: Response)=> {
    const userType = await getUserType(req, res)
    res.render((path.resolve(__dirname, '..', '..', 'views', 'users', userType ,'relevantes')));
})

router.get('/escolhas', isAuthenticated, async (req: any, res: Response)=> {
    const userType = await getUserType(req, res)
    res.render((path.resolve(__dirname, '..', '..', 'views', 'users', userType ,'escolhas')));
})

router.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});

module.exports = router;