import express, { Request, Response } from 'express'
const { getUserType, isAuthenticated } = require('../services/tokenHandler') 
const {getHTMLPath, } = require('../services/pages')

async function getPage(req: Request, res: Response, finalPath: string) {
    if (!(await isAuthenticated(req, res))) return res.redirect('/login');

    try {
        const userType = await getUserType(req, res) || null
        res.render(await getHTMLPath(userType, finalPath))
    } catch (error: any) {
        res.send(`500: Internal Server Error`);
    }   
}

module.exports = { getPage, }