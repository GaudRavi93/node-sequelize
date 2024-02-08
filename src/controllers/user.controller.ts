import { User } from "../models/user.model";
import { HttpStatus } from "../utils/httpStatus";
import { NextFunction, Request, Response } from "express";
import { comparePassword, generateToken, hashPassword } from "../utils/helper";

export class UserController extends HttpStatus {
    async signUp(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const requestBody: any = req.body;
            requestBody.password = await hashPassword(requestBody.password);

            const existingUser = await User.findOne({
                where: {
                    email: requestBody.email
                }
            });

            if(existingUser) return httpStatus.badRequestResponse(res, "Email address already exist.")

            const result = await User.create(requestBody);
            if(result){
                return httpStatus.recordCreatedResponse(res, "User created successfully.",result)
            }else{
                return httpStatus.badRequestResponse(res, "Unable to create user.")
            }
        } catch(error: any){
            return httpStatus.badRequestResponse(res, error.message);
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return httpStatus.badRequestResponse(res, "Invalid email or password.");
            }
            
            const user: any = await User.findOne({ where: { email } });
            if(!user){
                return httpStatus.badRequestResponse(res, "Invalid email or password.");
            }
            
            const isValidPassword = await comparePassword(password, user.password)
            if(!isValidPassword){
                return httpStatus.badRequestResponse(res, "Invalid email or password.");
            }

            const token = generateToken(user);
            return httpStatus.successResponse(res, "Login successfully.", {user, token});

        }catch(error: any){
            return httpStatus.badRequestResponse(res, error.message);
        }
    }
}