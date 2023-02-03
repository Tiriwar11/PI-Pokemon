const { DataTypes } = require('sequelize');
const { UUID } = require("sequelize");
const { UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('type', {
  
      id:{
        type: UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },{
      timestamps: true,
      createdAt: false,
      updatedAt: 'actualizado'
    });
  };