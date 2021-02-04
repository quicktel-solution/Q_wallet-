import { Model } from 'sequelize'

export interface AddOnAttr {
    addOnId?: string
    addOnName?: string
    addOnCategoryId?: string
    orderId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface AddOnModelI extends Model<AddOnAttr>, AddOnAttr {}
