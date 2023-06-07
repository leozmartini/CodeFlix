import express, { Request as any, Response } from 'express'
const { isAuthenticated, getUserType } = require('../tokenVerify')  
const router = express.Router()

const path = require('path')

router.get('/protected/images/:imageName',  isAuthenticated, (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images', imageName))
})

router.get(`/protected/images/users/user/:imageName`, isAuthenticated, async (req: any, res: Response) => {
    const userType = await getUserType(req, res)
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','users',userType, 'images', imageName))
})

router.get('/protected/images/timeline/:imageName', isAuthenticated, async (req: any, res: Response) => {
    const userType = await getUserType(req, res)
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','users',userType,'images','timeline', imageName))
})

router.get('/protected/src/:fileName', isAuthenticated, (req: any, res: Response) => {
    const fileName = req.params.fileName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','src', fileName))
})


router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
