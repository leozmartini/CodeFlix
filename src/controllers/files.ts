import { Request, Response } from 'express';
import { getProtectedPath, } from '../services/getProtectedPath';
import { getUserType } from '../services/tokenHandler';

function getImages(req: Request, res: Response) {
    try {
        const imageName = req.params.imageName
        res.sendFile(getProtectedPath(['images', imageName]))
    } catch (error) {
        res.status(404).send('404');
    }
};

async function getUserImages(req: Request, res: Response) {
    const userType = await getUserType(req, res)
    if (!userType) return res.status(400).send('Token inválido.');

    try {
        const imageName = req.params.imageName;

        res.sendFile(getProtectedPath(['users', userType, 'images', imageName]))
    } catch (error) {
        res.status(404).send('404');
    }
}

async function getUserImagesByDirectory(req: Request, res: Response, directory: string) {
    try {
        const userType = await getUserType(req, res)
        const imageName = req.params.imageName;
        res.sendFile(getProtectedPath(['users', userType, 'images', directory, imageName]))
    } catch (error: any) {
        res.status(404).send("404");
    }
}

function getSrcFile(req: Request, res: Response) {
    try {
        const fileName = req.params.fileName;

        res.sendFile(getProtectedPath(['src', fileName]))
    } catch (error) {
        res.status(404).send('404');
    }
}



export { getImages, getSrcFile, getUserImages, getUserImagesByDirectory };
