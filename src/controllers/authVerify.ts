import { NextFunction, Request, Response } from 'express';
import { isAuthenticated } from "../services/tokenHandler";

async function authVerify(req: Request, res: Response, next: NextFunction) {
  await isAuthenticated(req, res) ? next() : res.redirect('/login');
}

async function loginRedirect(req: Request, res: Response, next: NextFunction) {
  await isAuthenticated(req, res) ? res.redirect('/pages/principal') : res.render('login');
}

export { authVerify, loginRedirect };
