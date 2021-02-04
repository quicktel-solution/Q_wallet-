import { Model } from 'sequelize'
import { UsersPasswordAttr } from './usersPasswords'
export interface UsersAttr {
    userId?: string
    firstName?: string
    lastName?: string
    fullName?: string
    email?: string
    phoneNumber?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface ContextAttr {
    user: UsersModelI
    restaurantId: string
    authToken: string
}

export interface LoginAttr {
    email: UsersAttr['email']
    password: UsersPasswordAttr['password']
}

export interface UsersModelI extends Model<UsersAttr>, UsersAttr {
    [genAuthToken: string]: any
}
