import express from 'express'
const router = express.Router()


import { listDir } from '../../protected/src/listDir';

router.get('/array', async (req: any, res: any) => {
    const files = await listDir()
    res.send(files)
})

module.exports = router;
