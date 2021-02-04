import { sequelize, DataTypes } from '../config/db'
import { PasswordResetCodeModelI } from '../interfaces/PasswordResetCode'

export const PasswordResetCode = sequelize.define<PasswordResetCodeModelI>(
    'PasswordResetCode',
    {
        passwordResetCodeId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        passwordResetToken: {
            type: DataTypes.STRING({ length: 256 }),
            allowNull: false,
        },

        passwordResetCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        paranoid: true,
    },
)
