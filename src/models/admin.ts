import { sequelize, DataTypes } from '../config/db'
import { AdminModelI } from '../interfaces/admins'

export const Admins = sequelize.define<AdminModelI>(
    'Admins',
    {
        adminId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        passsword: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        phoneNumber: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        deletedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
    },
)
