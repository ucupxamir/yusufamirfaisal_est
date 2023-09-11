'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Karyawan extends Model {
        static associate(models) {

        }
    }
    Karyawan.init({
        nik: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING(8)
        },
        nama: {
            type: Sequelize.STRING(150)
        },
        alamat: {
            type: Sequelize.TEXT
        },
        tgllahir: {
            type: Sequelize.DATE
        },
        divisi: {
            type: Sequelize.STRING(20)
        },
        status: {
            type: Sequelize.STRING(20)
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: "created_date",
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    }, {
    sequelize,
    tableName: "M_KARYAWAN"
});
return Karyawan;
};