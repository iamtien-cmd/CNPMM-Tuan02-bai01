import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Option 3: Passing parameters separately (other dialects)
const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME || 'node_fulltask',
    process.env.DB_USER || 'root', 
    process.env.DB_PASSWORD || '1234567890',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

export const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
