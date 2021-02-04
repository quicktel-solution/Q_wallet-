import { Model } from 'sequelize'

export interface RestaurantAttr {
    restaurantId?: string
    restaurantName?: string
    email?: string
    phoneNumber?: string
    streetAddress?: Date
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface RestaurantModelI extends Model<RestaurantAttr>, RestaurantAttr {}
