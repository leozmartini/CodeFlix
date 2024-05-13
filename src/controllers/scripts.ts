import express, { Request, Response } from 'express'
import { getUserType } from '../services/tokenHandler'
import { listTimeline } from '../helpers/listTimeline'

async function getScripts(req: Request, res: Response) {
    try {
        const userType = await getUserType(req, res);
        const files = await listTimeline(userType)
        res.send(files);
    } catch (error: any) {
        error.message === '400' ? res.status(400).send('Token inválido.') : res.status(500).send('Internal server error.')
    }
}

export { getScripts, }