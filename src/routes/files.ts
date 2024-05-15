import express, { Request, Response } from 'express'
import { getImages, getSrcFile, getUserImages, getUserImagesByDirectory } from '../controllers/files'
const router = express.Router()

router.get('/protected/images/:imageName', getImages)
router.get(`/protected/images/users/user/:imageName`, getUserImages)
router.get('/protected/images/timeline/:imageName', (req: Request, res: Response) => getUserImagesByDirectory(req, res, 'timeline'))
router.get('/protected/src/:fileName', getSrcFile)


router.use(function (req, res, next) {
    res.status(404)
    res.send('404')
});

module.exports = router;
