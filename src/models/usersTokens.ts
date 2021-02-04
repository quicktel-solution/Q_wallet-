import { sequelize, DataTypes } from '../config/db'
import { UsersTokenModelI } from '../interfaces/usersTokens'

export const UsersToken = sequelize.define<UsersTokenModelI>(
    'UsersToken',
    {
        tokenId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        token: {
            type: DataTypes.STRING({ length: 1024 }),
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
