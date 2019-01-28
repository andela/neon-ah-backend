export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  Comment.associate = (models) => {
    const {
      Reply,
      Article,
      User,
      CommentLike,
    } = models;
    Comment.hasMany(Reply, {
      foreignKey: 'commentId',
      as: 'replies'
    });
    Comment.belongsTo(Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
    Comment.hasMany(CommentLike, {
      foreignKey: 'commentId',
      as: 'likes'
    });
    Comment.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
