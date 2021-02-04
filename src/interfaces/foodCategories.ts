import { Model } from 'sequelize'

export interface FoodCategoryAttr {
    categoryId?: string
    categoryName?: string
    categoryDescription?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface FoodCategoryModelI extends Model<FoodCategoryAttr>, FoodCategoryAttr {}
