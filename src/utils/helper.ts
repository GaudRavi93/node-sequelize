import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInterface } from "../models/user.model";

export async function hashPassword(password: string){
    return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashPassword: string){
    return await bcrypt.compare(password, hashPassword);
}

export function generateToken(user: UserInterface){
    const tokenData = {
        id: user.id,
        phone: user.phone,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName
    };

    return jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "180d"
    });
}