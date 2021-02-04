import { sequelize, DataTypes } from '../config/db'
import { UsersAttr, UsersModelI } from '../interfaces/users'
import { sign } from 'jsonwebtoken'
import { UsersPassword } from './usersPassword'
import { UsersToken } from './usersTokens'
import { PasswordResetCode } from './passwordResetCode'

export const Users = sequelize.define<UsersModelI>(
    'Users',
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        firstName: {
            type: DataTypes.STRING({ length: 100 }),
            allowNull: false,
            validate: {
                len: {
                    msg: 'First name can not be empty',
                    args: [1, 100],
                },
            },
        },
        lastName: {
            type: DataTypes.STRING({ length: 100 }),
            allowNull: false,
            validate: {
                len: {
                    msg: 'Last name can not be empty',
                    args: [1, 100],
                },
            },
        },
        fullName: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['firstName', 'lastName']),
            get() {
                return `${this.firstName} ${this.lastName}`
            },
        },
        email: {
            type: DataTypes.STRING({ length: 50 }),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Enter a valid email',
                },
            },
        },
        phoneNumber: {
            type: DataTypes.STRING({ length: 11 }),
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: {
                    msg: 'Enter a valid phone number',
                },
            },
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
    },
)

Users.hasOne(UsersPassword, {
    foreignKey: 'userId',
})

UsersPassword.belongsTo(Users, {
    foreignKey: 'userId',
})

Users.hasOne(UsersToken, {
    foreignKey: 'userId',
})

UsersToken.belongsTo(Users, {
    foreignKey: 'userId',
})

PasswordResetCode.belongsTo(Users, {
    foreignKey: 'userId',
})

Users.prototype.genAuthToken = async function() {
    const secret = `${process.env.SECRET_KEY}`
    const data: UsersAttr = {
        userId: this.userId,
    }
    const token = sign(data, secret)
    return token
}
