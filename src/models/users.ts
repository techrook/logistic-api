// src/models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import DB from '../config/database.config';

// Define the attributes of the User model
interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Define the optional attributes for creating a new User instance (excluding the id)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model and extend the Model class provided by Sequelize
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  // Define the attributes of the User model
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;

  // Initialize the User model with the specified attributes and options
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
}

// Call initialize to setup the model
User.initialize();

// Export the User model
export default User;
