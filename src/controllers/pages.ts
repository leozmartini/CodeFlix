import express, { Request, Response } from 'express'
const { isAuthenticated, getUserType } = require('../services/tokenHandler') 
const {getHTMLPath, } = require('../services/pages')
const path = require('path')

async function getPage(req: Request, res: Response, finalPath: string) {
    try {
        const userType = await getUserType(req, res)
        res.render(await getHTMLPath(userType, finalPath))
    } catch (error) {
        res.send(error) // Usuário não autenticado
    }   
}

module.exports = { getPage, }