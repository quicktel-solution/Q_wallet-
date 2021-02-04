import { Model } from 'sequelize'

export interface PasswordResetCodeAttr {
    passwordResetCodeId?: string
    userId?: string
    passwordResetToken?: string
    passwordResetCode?: string
    newPassword?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface PasswordResetCodeModelI
    extends Model<PasswordResetCodeAttr>,
        PasswordResetCodeAttr {}
