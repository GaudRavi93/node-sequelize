import { Router } from "express";
import { CategoryController } from './../controllers/category.controller';

export class CategoryRoute {
    public router: Router = Router();
    private categoryController: CategoryController = new CategoryController();

    constructor(){
        this.router.get("/", this.categoryController.getAllCategory)
        this.router.post("/", this.categoryController.addCategory)
    }
}