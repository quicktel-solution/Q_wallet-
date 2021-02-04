import { UsersAttr, LoginAttr } from '../../interfaces/users'
import { UsersPasswordAttr } from '../../interfaces/usersPasswords'
import { Users } from '../../models/users'
import { UsersToken } from '../../models/usersTokens'
import { ErrorHandler} from '../../middleware/errorHandler'
import {
    sendEmail,
    validateEmail,
    getRandomNumber,
    validateResetToken,
} from '../helper/helpers'
import { emailResetCodeObject } from '../emailTemplates/authenticator'
import { PasswordResetCode } from '../../models/passwordResetCode'
import { PasswordResetCodeAttr } from '../../interfaces/PasswordResetCode'
import { UsersPassword } from '../../models/usersPassword'

export default {
    Query: {},
    Mutation: {
        signup: async (parent: void, args: UsersAttr) => {
            try {
                const { password } = args as UsersPasswordAttr

                const user = await Users.create(args)
                await user.createUsersPassword({ password })

                return { msg: 'Signup successful', success: true }
            } catch (error) {
                throw new Error(error)
            }
        },

        login: async (parent: void, args: LoginAttr) => {
            try {
                const { email } = args
                const user = await Users.findOne({ where: { email } })

                if (!user) {
                    throw new Error('Login failed! Check authentication credentials')
                }

                const { userId } = user

                const token = await user.genAuthToken()

                await UsersToken.create({ userId, token })

                return { user, token, msg: 'Login successful', success: true }
            } catch (error) {
                throw new (error)
            }
        },

        resetPassword: async (parent: void, args: LoginAttr) => {
            try {
                const { email } = args
                const userAccount = await Users.findOne({ where: { email } })

                if (!userAccount) throw 'Error! No account for the email or password'

                const { fullName, userId } = userAccount
                const randomNo = getRandomNumber(6, 'A#')
                const generatedToken = getRandomNumber(256, 'aA#!')

                const savedPasswordResetCode = await PasswordResetCode.create({
                    userId,
                    passwordResetCode: `${randomNo}`,
                    passwordResetToken: generatedToken,
                })

                if (!savedPasswordResetCode) throw 'Error! Unable to save password reset code'

                const { subject, text, html } = emailResetCodeObject(fullName, randomNo)

                const isEmail = validateEmail(email)

                if (isEmail) {
                    const sentEmail = await sendEmail(email, subject, text, html)
                    const { accepted, response } = sentEmail

                    if (accepted[0] === email) {
                        return { msg: response, success: true }
                    }
                    return { msg: 'Error! Unable to send email', success: false }
                }
            } catch (error) {
                throw new ErrorHandler('Unable to send email', error.responseCode)
            }
        },

        confirmResetCode: async (parent: void, { passwordResetCode }: PasswordResetCodeAttr) => {
            try {
                const userTokenObject = await validateResetToken(passwordResetCode)

                if (!userTokenObject)
                    throw {
                        message: 'Token has expired. Please try password reset again',
                    }

                return { msg: 'Successful', success: true }
            } catch (error) {
                throw new ErrorHandler('Invalid password reset code ', error.responseCode)
         
            }
        },

        createNewPassword: async (parent: void, args: PasswordResetCodeAttr) => {
            try {
                const { newPassword, passwordResetCode } = args

                const userTokenObject = await validateResetToken(passwordResetCode)

                if (!userTokenObject)
                    throw {
                        message: 'Token has expired. Please try password reset again',
                    }

                const { userId } = userTokenObject
                const user = await Users.findByPk(userId)

                if (!user) {
                    throw " Error! User does't exist"
                }

                const token = await user.genAuthToken()
                await UsersPassword.update(
                    { password: newPassword },
                    {
                        where: {
                            userId,
                        },
                        individualHooks: true,
                    },
                )
                await UsersToken.update(
                    { token },
                    {
                        where: {
                            userId,
                        },
                        individualHooks: true,
                    },
                )

                return { msg: 'Password reset successful', success: true, token }
            } catch (error) {
                throw new ErrorHandler('Unable to create new password', error.responseCode)
            }
        }
    },
}
