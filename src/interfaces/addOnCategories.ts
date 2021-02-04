import { Model } from 'sequelize'

export interface AddOnCategoryAttr {
    categoryId?: string
    categoryName?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface AddOnCategoryModelI extends Model<AddOnCategoryAttr>, AddOnCategoryAttr {}
