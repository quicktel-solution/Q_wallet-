import { sequelize, DataTypes } from '../config/db'
import { UsersPasswordAttr, UsersPasswordModelI } from '../interfaces/usersPasswords'
import { genSalt, hash, compare } from 'bcrypt'

export const UsersPassword = sequelize.define<UsersPasswordModelI>(
    'UsersPassword',
    {
        passwordId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        password: {
            type: DataTypes.STRING({ length: 128 }),
            allowNull: false,
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

UsersPassword.beforeSave(async user => {
    if (user.changed('password')) {
        const salt = await genSalt(10)
        const hashedPasword = await hash(user.password, salt)
        user.password = hashedPasword
    }
})

export const confirmPassword = async (
    password: UsersPasswordAttr['password'],
    userId: UsersPasswordAttr['userId'],
) => {
    const usr = await UsersPassword.findOne({
        where: {
            userId,
        },
    })
    if (!usr) {
        throw new Error('User not authenticated!')
    }
    const passwordMatch = await compare(password, `${usr.password}`)

    return passwordMatch
}
