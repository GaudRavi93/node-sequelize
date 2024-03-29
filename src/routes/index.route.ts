import { Router } from "express";
import { UserRoute } from "./user.route";
import { ProductRoute } from "./product.route";
import { CategoryRoute } from "./category.route";
import { validateToken } from "../middlewares/authMiddleware";

export class Routes {
    public router: Router = Router();
    
    // routes instances
    private userRoutes: UserRoute = new UserRoute();
    private productRoute: ProductRoute = new ProductRoute();
    private categoryRoute: CategoryRoute = new CategoryRoute();
    

    constructor(){
        this.router.use("/user", this.userRoutes.router);
        this.router.use("/product", validateToken, this.productRoute.router);
        this.router.use("/category", validateToken, this.categoryRoute.router);
    }
}