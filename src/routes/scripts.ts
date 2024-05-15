import express from 'express';
import { getFiles } from '../controllers/scripts';
const router = express.Router()

// Recebe o nome das fotos sorteadas e envia as mesmas.
router.get('/array', getFiles)

router.use(function (req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
