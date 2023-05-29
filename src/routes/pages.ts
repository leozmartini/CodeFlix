import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/principal', (req: Request, res: Response)=> {
    res.render('../views/principal')
})

router.get('/math', (req: Request, res: Response)=> {
    res.render('../views/math')
})

router.get('/musicas', (req: Request, res: Response)=> {
    res.render('../views/musicas')
})

router.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});

module.exports = router;