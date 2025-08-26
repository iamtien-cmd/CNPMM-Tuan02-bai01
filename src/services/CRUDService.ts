import bcrypt from 'bcryptjs';
import { User } from '../models';
import { UserCreationAttributes, UserAttributes } from '../types';

const salt: string = bcrypt.genSaltSync(10);

export const createNewUser = async (data: UserCreationAttributes): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt: string = await hashUserPassword(data.password);

            await User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === true,
                roleId: data.roleId
            });

            resolve('OK create a new user successfully');
        } catch (e) {
            reject(e);
        }
    });
};

const hashUserPassword = (password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword: string = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

export const getAllUser = (): Promise<UserAttributes[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

export const getUserInfoById = (userId: string): Promise<UserAttributes | null> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: { id: userId },
                raw: true
            });
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export const updateUser = (data: Partial<UserAttributes> & { id: number }): Promise<UserAttributes[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: { id: data.id }
            });
            if (user) {
                if (data.firstName) user.firstName = data.firstName;
                if (data.lastName) user.lastName = data.lastName;
                if (data.address) user.address = data.address;
                await user.save();
                
                const allusers = await User.findAll();
                resolve(allusers.map(u => u.toJSON()));
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export const deleteUserById = (userId: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: { id: userId }
            });
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
