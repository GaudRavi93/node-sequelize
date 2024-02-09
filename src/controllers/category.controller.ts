import { User } from "../models/user.model";
import { decodeToken } from "../utils/helper";
import { HttpStatus } from "../utils/httpStatus";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { NextFunction, Request, Response } from "express";

export class CategoryController extends HttpStatus {
    async addCategory(req: Request, res: Response, next: NextFunction){
        const httpStatus: HttpStatus = new HttpStatus();

        try {
            const requestBody = req.body;
            const user: any = decodeToken(req);
            requestBody.user_id = user.id;
            
            const result = await Category.create(requestBody);
            if(result){
                return httpStatus.recordCreatedResponse(res, "New category added successfully.", result);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to save category.");
            }
        } catch (error) {
            return httpStatus.badRequestResponse(res, "Unable to save category.");
        }
    }

    async getAllCategory(req: Request, res: Response, next: NextFunction){
        const user: any = decodeToken(req);
        const httpStatus: HttpStatus = new HttpStatus();
        try {
            const result = await Category.findAll(
                {
                    where: {
                        user_id: user.id
                    },
                    include: [
                        {
                            model: User,
                            as: "user_details",
                            attributes: ["id", "firstName", "lastName", "email", "phone"]
                        },
                        {
                            model: Product,
                            as: "products",
                            attributes: ["id", "name", "quantity", "price", "actualCost", "image"]
                        }
                    ]
                }
            );
            if(result){
                return httpStatus.successResponse(res, "Categories finds successfully.", result);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to get categories.");
            }
        } catch (error) {
            return httpStatus.badRequestResponse(res, "Unable to get categories.")
        }
    }
}