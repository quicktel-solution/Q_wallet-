import { sequelize, DataTypes } from '../config/db'
import { OdersModelI } from '../interfaces/oders'

export const Orders = sequelize.define<OdersModelI>(
    'Orders',
    {
        orderId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        restaurantId: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        foodItemId: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        riderId: {
            type: DataTypes.STRING,
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
