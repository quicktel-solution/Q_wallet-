import { Model } from 'sequelize'
export interface UsersTokenAttr {
    tokenId?: string
    token: string
    userId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface UsersTokenModelI extends Model<UsersTokenAttr>, UsersTokenAttr {}
