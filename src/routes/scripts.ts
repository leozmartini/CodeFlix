import express, { Request, Response } from 'express'
const router = express.Router()
const userType = "13" 


import { listDir } from '../listDir';


router.get('/array', async (req: any, res: Response) => {
    const files = await listDir(userType)
    res.send(files)
})

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
