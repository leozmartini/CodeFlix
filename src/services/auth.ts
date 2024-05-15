import { Request, Response } from 'express';
import { getDate } from '../helpers/getDate';
import { listUsers } from '../helpers/listUsers';

const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();
const SECRET = process.env.SECRET
const ADMIN = process.env.SECRET

async function loginVerify(req: Request, res: Response) {
    const { username, password } = req.body

    // validations 
    if (!username || !password) return

    const userData = await User.findOne({ username: username })
    if (!userData) throw new Error("404")

    await bcrypt.compare(password, userData.password).then((Authorized: boolean) => {
        if (!Authorized) throw new Error("401")
    });

    // Authorized

    // update lasLogin
    userData.lastLogin = getDate()
    await userData.save()
        .catch((error: any) => { console.log(`Erro ao salvar lastLogin: ${error}`) })

    // create cookie with JWT token
    const token = jwt.sign({
        userType: userData.userType
    }, SECRET, { expiresIn: 600 }) // segundos

    res.cookie('token', token, {
        maxAge: 600000, // 10 mins
        httpOnly: true, // impede acesso via JavaScript no cliente
    });


    return {
        token: token,
        statusLogin: "202",
        redirect: "/pages/principal"
    };
}

async function createUser(req: Request, res: Response) {
    const { adminKey, username, password } = req.body
    const users = await listUsers()
    let { userType } = req.body

    // validations
    if (Object.keys(req.body).length === 0) throw new Error('400') // 204 = No content
    if (!ADMIN || adminKey != ADMIN) throw new Error('401');
    if (!username || !password || !userType) throw new Error('400');
    if (!users.includes(userType)) throw new Error('404');

    const userExists = await User.findOne({ username: username })
    if (userExists && password != 'delete') throw new Error('409') // 409 = Conflict

    // bcrypt
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        username,
        password: passwordHash,
        userType: userType,
        lastLogin: getDate()
    })

    try {
        await user.save()
    } catch (error) {
        throw new Error('500')
    }

}

async function deleteUserFromDB(req: Request, res: Response) {
    const { adminKey, username } = req.body;
    if (!ADMIN || adminKey !== ADMIN) throw new Error('401');
    if (!username) throw new Error('400');
    if (!await User.findOne({ username: username })) throw new Error('404');

    try {
        await User.deleteOne({ username: username });
        return username;
    } catch (error) {
        throw new Error('500');
    }
}

async function listAllUsers() {
    let userlist: object[] = [];
    const usuarios = await User.find();
    usuarios.forEach((usuario: { username: string; lastLogin: Date; }) => {
        userlist.push({ username: usuario.username, lastLogin: usuario.lastLogin });
    });
    return userlist;
}

export { loginVerify, createUser, deleteUserFromDB, listAllUsers };

