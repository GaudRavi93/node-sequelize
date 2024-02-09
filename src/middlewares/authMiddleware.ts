import { User } from "../models/user.model";
import { decodeToken } from "../utils/helper";
import { HttpStatus } from "../utils/httpStatus";
import { NextFunction, Request, Response } from "express";


export async function validateToken(req: Request, res: Response, next: NextFunction){
    const httpStatus: HttpStatus = new HttpStatus();

    const token = req.header('authorization');
    if(!token){
        return httpStatus.unauthorizedResponse(res, "Access denied. Token not provided.");
    }
    
    try {
        const user: any = decodeToken(req);
        const userExist = await User.findByPk(user.id);
        if(!userExist){
            return httpStatus.unauthorizedResponse(res, "Access denied. Invalid user.");
        }
        next();

    } catch (error) {
        return httpStatus.unauthorizedResponse(res, "Access denied. Invalid token.");
    }
}