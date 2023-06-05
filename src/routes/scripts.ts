import express, { Request, Response } from 'express'
const router = express.Router()

import { listDir } from '../listDir';

const authVerify = (req: any, res: any, next: any) => {
    if (!req.session.authenticated) {
        res.status(401).redirect('/login')
    } else {
        next()
    }
}

router.get('/array', authVerify,  async (req: any, res: Response) => {
    const files = await listDir(req.session.userType)
    res.send(files)
})

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
