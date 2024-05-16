// src/models/package.ts
import { DataTypes, Model, Optional } from 'sequelize';
import DB from '../config/database.config';
import User from './users'; 


interface PackageAttributes {
  id: string;
  name: string;
  status: 'on-route' | 'delivered' | 'failed';
  pickUpDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string; 
}


interface PackageCreationAttributes extends Optional<PackageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}


export class Package extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
  public id!: string;
  public name!: string;
  public status!: 'on-route' | 'delivered' | 'failed';
  public pickUpDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: string; 

  
  public static initialize() {
    Package.init(
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
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'on-route',
          validate: {
            isIn: [['on-route', 'destination', 'failed']],
          },
        },
        pickUpDate: {
          type: DataTypes.DATE,
          allowNull: false,
          
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize: DB,
        tableName: 'packages',
        timestamps: true,
      }
    );
  }


  public static associate() {
    Package.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}


Package.initialize();


export default Package;
