// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import DB from '../config/database.config';
import { UserAttributes } from '../interfaces/users.interface';
import { Package } from './package'; 

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  // Define the attributes of the User model
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;


  public static initialize() {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: DB,
        tableName: 'users',
      }
    );
  }
  public static associate() {
    User.hasMany(Package, {
      foreignKey: 'userId',
      as: 'packages',
    });
  }
}


User.initialize();


export default User;
