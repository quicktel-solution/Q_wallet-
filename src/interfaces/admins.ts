import { Model } from 'sequelize'

export interface AdminAttr {
    adminId?: string
    username?: string
    passsword?: string
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface AdminModelI extends Model<AdminAttr>, AdminAttr {}
