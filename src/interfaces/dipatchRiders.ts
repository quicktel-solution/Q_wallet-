import { Model } from 'sequelize'

export interface RidersAttr {
    riderId?: string
    riderName?: string
    phoneNumber?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface RidersModelI extends Model<RidersAttr>, RidersAttr {}
