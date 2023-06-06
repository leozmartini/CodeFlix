import express, { Request, Response } from 'express'
const router = express.Router()
const { isAuthenticated, getUserType } = require('../tokenVerify') 

import { listDir } from '../listDir';


router.get('/array', isAuthenticated, async (req: any, res: Response) => {
    const userType = await getUserType(req, res)
    const files = await listDir(userType)
    res.send(files)
})

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
