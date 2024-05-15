import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.MONGO_PASS

async function isAuthenticated(req: Request, res: Response): Promise<boolean> {
  let isAuthenticated = false;

    const token = req.cookies['token'];
    try {
      await jwt.verify(token, SECRET);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  
  return isAuthenticated;
}

async function getUserType(req: Request, res: Response): Promise<string> {
  try {
      const token = req.cookies['token'];
      const decodedToken = await jwt.verify(token, SECRET);
      return decodedToken.userType
    } catch (error) {
      throw new Error('400');
    }
}

export { isAuthenticated, getUserType, };