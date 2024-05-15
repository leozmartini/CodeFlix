import { Request, Response } from 'express';
import { listTimeline } from '../helpers/listTimeline';
import { getUserType } from '../services/tokenHandler';

async function getFiles(req: Request, res: Response) {
    try {
        const userType = await getUserType(req, res);
        const files = await listTimeline(userType)
        res.send(files);
    } catch (error: any) {
        error.message === '400' ? res.status(400).send('Token inválido.') : res.status(500).send('Internal server error.')
    }
}

export { getFiles };
