import express, { Request, Response } from 'express'
const router = express.Router()

import { listDir } from '../listDir';

router.get('/array', async (req: Request, res: Response) => {
    const files = await listDir()
    res.send(files)
})

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
