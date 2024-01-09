const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

  }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "First name can only contain letters."
        },
        notNull: {
          msg: "First name can't be empty."
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlpha: {
          msg: "Last name can only contain letters.",
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Wrong email format"
        }
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["Male", "Female"],
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 50],
          msg: 'Password must be min. 8 characters and max. 50 characters'
        }
      }
    }
    // photo: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // }
  }, {
    sequelize,
    modelName: 'User',
    updatedAt: false,
  });

  User.beforeSave(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  return User;
}