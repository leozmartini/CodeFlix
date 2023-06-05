import express, { Request as any, Response } from 'express'
const router = express.Router()

const authVerify = (req: any, res: any, next: any) => {
    if (!req.session.authenticated) {
        res.status(401).send('401')
    } else {
        next()
    }
}

const path = require('path')

router.get('/protected/images/:imageName', authVerify, (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images', imageName))
})

router.get(`/protected/images/users/user/:imageName`, authVerify, (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images','users',req.session.userType.toString(), imageName))
})

router.get('/protected/images/timeline/:imageName', authVerify, (req: any, res: Response) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','images','users',req.session.userType.toString(),'timeline', imageName))
})

router.get('/protected/src/:fileName', authVerify, (req: any, res: Response) => {
    const fileName = req.params.fileName;
    res.sendFile(path.resolve(__dirname, '..','..','protected','src', fileName))
})


router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
