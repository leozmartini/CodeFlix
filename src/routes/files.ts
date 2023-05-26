import express from 'express'
const router = express.Router()

const path = require('path')

router.get('/protected/images/:imageName', (req: any, res: any) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '../../protected/images', imageName))
})

router.get('/protected/images/timeline/:imageName', (req: any, res: any) => {
    const imageName = req.params.imageName;
    res.sendFile(path.resolve(__dirname, '../../protected/images/timeline', imageName))
})

router.get('/protected/src/:fileName', (req: any, res: any) => {
    const fileName = req.params.fileName;
    res.sendFile(path.resolve(__dirname, '../../protected/src', fileName))
})

module.exports = router;
