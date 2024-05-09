import { NextFunction, Request, Response } from "express";

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.MONGO_PASS

async function isAuthenticated(req: Request, res: Response): Promise<boolean> {
  let isAuthenticated = false;
  await cookieParser()(req, res, async () => {
    const token = req.cookies['token'];
    try {
      await jwt.verify(token, SECRET);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  });
  return isAuthenticated;
}

function loginRedirect(req: Request, res: Response, next: NextFunction) {
  cookieParser()(req, res, async () => {
    const token = req.cookies['token'];
    try {
      await jwt.verify(token, SECRET);
      res.redirect('/pages/principal')
    } catch (error) {
      next();
    }
  });
}

async function getUserType(req: Request, res: Response) {
  let userType
  await cookieParser()(req, res, async () => {
    const token = req.cookies['token'];
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      userType = decodedToken.userType
    } catch (error) {
      userType = null
    }
  });
  return userType
}

module.exports = { isAuthenticated, getUserType, loginRedirect }