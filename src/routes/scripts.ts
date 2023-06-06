import express, { Request, Response } from 'express'
const router = express.Router()
const { isAuthenticated, getUserType } = require('../tokenVerify') 

import { listTimeline } from '../listTimeline';


router.get('/array', isAuthenticated, async (req: any, res: Response) => {
    const userType = await getUserType(req, res)
    const files = await listTimeline(userType)
    res.send(files)
})

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
