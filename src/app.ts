import "dotenv/config";
import express, { Express, Request, Response } from "express";

export class App {
    express: Express = express();
    constructor(){
        this.express.use(express.json());

        this.express.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });

        // Route to check if server is working or not
        this.express.get('/', (req: Request, res: Response) => {
            res.send('Server Works! 🚀🚀 ');
        });
    }
}