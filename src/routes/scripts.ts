import express, { Request, Response } from 'express'
const router = express.Router()
import { getFiles } from'../controllers/scripts'

// Recebe o nome das fotos sorteadas e envia as mesmas.
router.get('/array', getFiles)

router.use(function(req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
