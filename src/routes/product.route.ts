import { Router } from "express";
import { ProductController } from './../controllers/product.controller';

export class ProductRoute {
    public router: Router = Router();
    private productController: ProductController = new ProductController();

    constructor(){
        this.router.post("/", this.productController.addProduct);
        this.router.get("/", this.productController.getAllProducts);
        this.router.put("/:id", this.productController.updateProduct);
    }
}