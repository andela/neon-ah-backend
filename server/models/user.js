export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your full name'
        }
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
        }
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
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter a password'
        }
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
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
      getEmailsNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      getInAppNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      authTypeId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  User.associate = (models) => {
    const {
      Article,
      AuthType,
      Comment,
      Reply,
      CommentLike,
      Notification,
      Share,
      Role,
      Report,
      ArticleLikesDislike,
      ReadingStats,
      Tag
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
    User.hasMany(Report, {
      foreignKey: 'userId',
      as: 'reports'
    });
    User.hasMany(ArticleLikesDislike, {
      foreignKey: 'userId',
      as: 'likes'
    });
    User.hasMany(Reply, {
      as: 'replies',
      foreignKey: 'userId'
    });
    User.hasMany(CommentLike, {
      foreignKey: 'userId'
    });
    User.hasMany(Notification, {
      as: 'sender',
      foreignKey: 'senderId'
    });
    User.hasMany(Notification, {
      as: 'receiver',
      foreignKey: 'receiverId'
    });
    User.hasMany(Share, {
      foreignKey: 'userId'
    });
    User.belongsToMany(Article, {
      through: 'Report',
      foreignKey: 'userId'
    });
    User.belongsToMany(Article, {
      through: 'ArticleLikesDislike',
      foreignKey: 'userId'
    });
    User.belongsTo(Role, {
      foreignKey: 'roleId'
    });
    User.belongsToMany(Article, {
      through: 'Rating',
      foreignKey: 'userId'
    });
    User.belongsToMany(Article, {
      through: 'Bookmark',
      foreignKey: 'userId'
    });
    User.belongsToMany(Article, {
      through: 'Report',
      foreignKey: 'userId'
    });
    User.belongsToMany(User, {
      through: 'Follow',
      as: 'following',
      foreignKey: 'followersId'
    });
    User.belongsToMany(User, {
      through: 'Follow',
      as: 'followers',
      foreignKey: 'userId'
    });
    User.hasMany(ReadingStats, {
      foreignKey: 'userId'
    });
    User.belongsToMany(Tag, {
      through: 'FollowedTags',
      as: 'followedTags',
      foreignKey: 'followerId'
    });
  };
  return User;
};
