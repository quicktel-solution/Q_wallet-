import { Model } from 'sequelize'
export interface UsersPasswordAttr {
    passwordId?: string
    password: string
    userId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface UsersPasswordModelI extends Model<UsersPasswordAttr>, UsersPasswordAttr {}
