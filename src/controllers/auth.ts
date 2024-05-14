import { NextFunction, Request, Response } from 'express';
import { getDate } from '../helpers/getDate';
import { listUsers } from '../helpers/listUsers';
import { createUser, deleteUserFromDB, loginVerify, listAllUsers } from '../services/auth';

const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();
const SECRET = process.env.MONGO_PASS
const ADMIN = process.env.MONGO_PASS


async function login(req: Request, res: Response, next: NextFunction) {
    try {
        await loginVerify(req, res);
    } catch (error: any) {
        res.json({ "statusLogin": error.message })
    }
}

function logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('token');
    res.redirect('/')
}

async function register(req: Request, res: Response) {
    try {
        await createUser(req, res).then(() => {
            res.status(201).json({ response: "usuario criado" })
        });
    } catch (error: any) {
        if (error.message == "401") res.status(401).send('Chave admin inválida.');
        if (error.message == "400") res.status(400).send(`
        Verifique a requisição e siga o padrão:
        {
            "adminKey": "",
            "username": "",
            "password": "",
            "userType": ""
        }
        `);
        if (error.message == "404") res.status(404).send('UserType não encontrado.');
        if (error.message == "409") res.status(409).send('Usuário já cadastrado.');
        if (error.message == "500") res.status(500).send('Internal Server Error');
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        await deleteUserFromDB(req, res).then((username) => {
            res.status(202).json({ response: `Usuário ${username} deletado.` })
        });
    } catch (error: any) {
        if (error.message == "401") res.status(401).send('Chave admin inválida');
        if (error.message == "500") res.status(500).send('Internal Server Error');
        if (error.message == "404") res.status(404).send('Usuário não encontrado.');
        if (error.message == "400") res.status(400).send('Verifique a requisição.')
        
    }
    
}

async function userList(req: Request, res: Response) {
    try {
       res.send(await listAllUsers())
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export { userList, login, logout, register, deleteUser, };

