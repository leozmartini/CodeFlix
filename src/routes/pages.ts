import express, { Request, Response } from 'express'

const router = express.Router()


router.get('/principal', (req: any, res: Response)=> {
    res.render('principal')
})

router.get('/math', (req: any, res: Response)=> {
    res.render('math')
})

router.get('/musicas', (req: any, res: Response)=> {
    res.render('musicas')
})

router.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});

module.exports = router;