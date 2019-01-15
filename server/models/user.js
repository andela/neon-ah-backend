export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your full name'
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a username'
      },
      unique: {
        args: true,
        msg: 'Username has been taken'
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
        isUpperCase: (value) => {
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password should contain at least one uppercase letter');
          }
        },
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notifySettings: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  User.associate = (models) => {
    const {
      Article,
      AuthType,
      Comment,
      Reply,
      CommentLike,
      Notification,
      Bookmark,
      Share,
      Role
    } = models;
    User.hasMany(Article, {
      as: 'articles',
      foreignKey: 'userId'
    });
    User.belongsTo(AuthType, {
      as: 'authTypes',
      foreignKey: 'authTypeId',
      targetKey: 'type'
    });
    User.hasMany(Comment, {
      foreignKey: 'userId',
      as: 'comments'
    });
    User.hasMany(Reply, {
      as: 'replies',
      foreignKey: 'userId'
    });
    User.hasMany(CommentLike, {
      foreignKey: 'userId',
    });
    User.hasMany(Notification, {
      as: 'sender',
      foreignKey: 'senderId',
    });
    User.hasMany(Notification, {
      as: 'receiver',
      foreignKey: 'receiverId'
    });
    User.hasMany(Bookmark, {
      foreignKey: 'userId',
    });
    User.hasMany(Share, {
      foreignKey: 'userId',
    });
    User.belongsTo(Role, {
      foreignKey: 'roleId',
    });
    User.belongsToMany(User, {
      through: 'Follow',
      as: 'followers',
      foreignKey: 'followersId',
    });
    User.belongsToMany(User, {
      through: 'Follow',
      as: 'following',
      foreignKey: 'userId',
    });
  };
  return User;
};