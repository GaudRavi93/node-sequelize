import { decodeToken } from "../utils/helper";
import { HttpStatus } from "../utils/httpStatus";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { NextFunction, Request, Response } from "express";


export class ProductController extends HttpStatus {
    async addProduct(req: Request, res: Response, next: NextFunction){
        const httpStatus: HttpStatus = new HttpStatus();
        try {
            const requestBody = req.body;
            const user: any = decodeToken(req);

            requestBody.user_id = user.id;
            const result = await Product.create(requestBody);

            if(result){
                return httpStatus.recordCreatedResponse(res, "Product created successfully.", result);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to create product.");
            }
        } catch (error) {
            return httpStatus.badRequestResponse(res, "Unable to create product.");
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction){
        const httpStatus: HttpStatus = new HttpStatus();
        try {
            const user: any = decodeToken(req);
            const result = await Product.findAll({
                where: {
                    user_id: user.id
                },
                include: [
                    {
                        model: Category,
                        as: "category"
                    }
                ]  
            });

            if(result){
                return httpStatus.successResponse(res, "Product finds successfully.", result)
            }else{
                return httpStatus.badRequestResponse(res, "Unable to get products.");
            }
        } catch (error) {
            return httpStatus.badRequestResponse(res, "Unable to get products.");
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction){
        // const httpStatus: HttpStatus = new HttpStatus();
        // try {
        //     const requestBody = req.body;
        //     const productId = req.params.id;

        //     const existingProduct = await Product.findByPk(productId);
        //     if(!existingProduct){
        //         return httpStatus.badRequestResponse(res, "Product doesn't exist.");
        //     }
            
        //     const result = await Product.update(requestBody, {
        //         where: {
        //             id: productId
        //         }
        //     });

        //     if(result){
        //         return httpStatus.successResponse(res, "Product updated successfully.", result)
        //     }else{
        //         return httpStatus.badRequestResponse(res, "Unable to update product.");
        //     }
        // } catch (error) {
        //     return httpStatus.badRequestResponse(res, "Unable to update product.");
        // }
    }
}