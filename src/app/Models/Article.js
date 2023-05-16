const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Article extends Model {}

Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  intro: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  bg_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    sequelize,
    tableName: 'articles',
    paranoid: true,
});

module.exports = Article;
