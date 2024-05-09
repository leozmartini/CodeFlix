import express, { Request, Response } from 'express'
const { getUserType } = require('../services/tokenHandler')  
const router = express.Router()

const path = require('path')

// Recebe os requires vindos do HTML e retorna o arquivo protegido correto.

router.get('/protected/images/:imageName', (req: Request, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images', imageName))
})

router.get(`/protected/images/users/user/:imageName`, async (req: Request, res: Response) => {
    const userType = await getUserType(req, res)
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','users',userType, 'images', imageName))
})

router.get('/protected/images/timeline/:imageName', async (req: Request, res: Response) => {
    const userType = await getUserType(req, res)
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','users',userType,'images','timeline', imageName))
})

router.get('/protected/src/:fileName', (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','src', fileName))
})


router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
