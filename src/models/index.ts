import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import sequelize from '../config/configdb';

// Initialize all models
const User_Model = initUserModel(sequelize);

// Set up associations
const models = {
  User: User_Model,
};

// Run associations
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { User_Model as User };
export { sequelize };
export default models;
