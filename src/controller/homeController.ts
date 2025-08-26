import { Request, Response } from 'express';
import { User } from '../models';
import * as CRUDService from '../services/CRUDService';

export const getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await User.findAll();
        console.log('.......................');
        console.log(data);
        console.log('.......................');
        res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
};

export const getAboutPage = (req: Request, res: Response): void => {
    res.render('test/about.ejs');
};

export const getCRUD = (req: Request, res: Response): void => {
    res.render('crud.ejs');
};

export const getFindAllCRUD = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await CRUDService.getAllUser();
        res.render('users/findAllUser.ejs', {
            datalist: data
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
};

export const postCRUD = async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await CRUDService.createNewUser(req.body);
        console.log(message);
        res.send('Post crud to server');
    } catch (e) {
        console.log(e);
        res.status(500).send('Error creating user');
    }
};

export const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.id as string;
    if (userId) {
        try {
            const userData = await CRUDService.getUserInfoById(userId);
            res.render('users/editUser.ejs', {
                data: userData
            });
        } catch (e) {
            console.log(e);
            res.status(500).send('Error getting user data');
        }
    } else {
        res.send('không lấy được id');
    }
};

export const putCRUD = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        const data1 = await CRUDService.updateUser(data);
        res.render('users/findAllUser.ejs', {
            datalist: data1
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Error updating user');
    }
};

export const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
    const id = req.query.id as string;
    if (id) {
        try {
            await CRUDService.deleteUserById(id);
            res.send('Deleted!!!!!!!!!!!!!');
        } catch (e) {
            console.log(e);
            res.status(500).send('Error deleting user');
        }
    } else {
        res.send('Not find user');
    }
};
