const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    get fullname() {
      return this.first_name + (this.last_name ? ' ' + this.last_name : '');
    }

    toJSON() {
      const values = { ...this.dataValues, full_name: this.fullname };
      delete values.password;
      if (values.photo != null) {
        const photo = values.photo.split('/');
        values.photo = `/public/${photo[photo.length - 1]}`;
      }
      return values;
    }
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
        },
        notNull: {
          msg: "Email can't be empty",
        }
      }
    },
    gender: {
      type: DataTypes.STRING(6),
      validate: {
        isIn: {
          args: ["Male", "Female"],
          msg: "Wrong gender value.",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 50],
          msg: 'Password must be min. 8 characters and max. 50 characters'
        },
        notNull: {
          msg: "Password can't be empty",
        }
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
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