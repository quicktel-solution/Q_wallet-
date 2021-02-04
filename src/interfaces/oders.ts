import { Model } from 'sequelize'

export interface OrdersAttr {
    orderId?: string
    restaurantId?: string
    foodItemId?: string
    riderId?: string
    deliveryAddress?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface OdersModelI extends Model<OrdersAttr>, OrdersAttr {}
