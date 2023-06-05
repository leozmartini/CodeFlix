import express, { Request as any, Response } from 'express'
const router = express.Router()
const userType = "13" 

const path = require('path')

router.get('/protected/images/:imageName',  (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images', imageName))
})

router.get(`/protected/images/users/user/:imageName`,  (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images','users',userType, imageName))
})

router.get('/protected/images/timeline/:imageName',  (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images','users',userType,'timeline', imageName))
})

router.get('/protected/src/:fileName',  (req: any, res: Response) => {
    const fileName = req.params.fileName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','src', fileName))
})


router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
