import express from 'express'
const router = express.Router()

router.get('/', (req: any, res: any)=> {
    res.render('index')
})

router.get('/principal', (req: any, res: any)=> {
    res.render('../views/principal')
})

router.get('/math', (req: any, res: any)=> {
    res.render('../views/math')
})

router.get('/musicas', (req: any, res: any)=> {
    res.render('../views/musicas')
})


module.exports = router;