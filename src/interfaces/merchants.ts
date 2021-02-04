import { Model } from 'sequelize'

export interface MerchantAttr {
    merchantId?: string
    contactName?: string
    contactPhone?: string
    foodCategory?: Date
    restaurantId?: Date
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface MerchantModelI extends Model<MerchantAttr>, MerchantAttr {}
