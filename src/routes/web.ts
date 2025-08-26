import express, { Application, Router, Request, Response } from 'express';
import * as homeController from '../controller/homeController';

const router: Router = express.Router();

export const initWebRoutes = (app: Application): Application => {
    // cách 1: code trực tiếp
    router.get('/', (req: Request, res: Response) => {
        return res.send('Liên Huệ Tiên');
    });

    // cách 2: gọi hàm trong controller
    router.get('/home', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getFindAllCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    return app.use("/", router);
};
