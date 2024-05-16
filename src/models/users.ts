// src/models/user.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import DB from '../config/database.config';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
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
          defaultValue:DataTypes.UUIDV4 ,
          allowNull : false
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
        sequelize:DB,
        tableName: 'users',
      }
    );

  }
}