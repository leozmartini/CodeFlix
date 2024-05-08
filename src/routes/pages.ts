import express, { Request, Response,  } from 'express'
const {getPage, } = require('../controllers/pages');

const router = express.Router()

router.get('/principal', (req: Request, res: Response) => getPage(req, res, 'principal'))
router.get('/relevantes', (req: Request, res: Response) => getPage(req, res, 'relevantes'))
router.get('/escolhas', (req: Request, res: Response) => getPage(req, res, 'escolhas'))

router.use(function(req, res, next) {
    res.status(404)
    res.render('404')
});

module.exports = router;