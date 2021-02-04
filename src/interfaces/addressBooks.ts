import { Model } from 'sequelize'

export interface AddressAttr {
    addressId?: string
    userId?: string
    area?: string
    street?: string
    city?: string
    state?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface AddressModelI extends Model<AddressAttr>, AddressAttr {}
