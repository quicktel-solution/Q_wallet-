import { sequelize, DataTypes } from '../config/db'
import { RidersModelI } from '../interfaces/dipatchRiders'

export const Riders = sequelize.define<RidersModelI>(
    'Riders',
    {
        riderId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        riderName: {
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
