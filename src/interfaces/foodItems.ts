import { Model } from 'sequelize'

export interface FoodItemAttr {
    foodId?: string
    foodName?: string
    restaurantId?: string
    foodCategory?: Date
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface FoodItemModelI extends Model<FoodItemAttr>, FoodItemAttr {}
