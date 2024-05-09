import express, { Request, Response } from 'express'
const router = express.Router()
const { isAuthenticated, getUserType } = require('../services/tokenHandler');
import { listTimeline } from '../helpers/listTimeline';

// Recebe o nome das fotos sorteadas e envia as mesmas.
router.get('/array', async (req: Request, res: Response) => {
    const userType = await getUserType(req, res)
    const files = await listTimeline(userType)
    res.send(files)
})

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
