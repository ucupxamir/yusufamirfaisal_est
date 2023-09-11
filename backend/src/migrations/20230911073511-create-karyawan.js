'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('M_KARYAWAN', {
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
                defaultValue: Sequelize.literal("NOW()")
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('M_KARYAWAN');
    }
};