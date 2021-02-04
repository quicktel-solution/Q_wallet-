import { Op } from 'sequelize'
import nodemailer from 'nodemailer'
import { UsersAttr } from '../../interfaces/users'
import { PasswordResetCode } from '../../models/passwordResetCode'
import { PasswordResetCodeAttr } from '../../interfaces/PasswordResetCode'
const PASSWORD_TOKEN_EXPIRED_TIME = process.env.PASSWORD_TOKEN_EXPIRED_TIME

export const validateResetToken = async (
    passwordResetCode: string | undefined,
): Promise<PasswordResetCodeAttr | null> => {
    if (!passwordResetCode) return null

    const expiryDate = Date.now() - Number(PASSWORD_TOKEN_EXPIRED_TIME)

    const userTokenObject = await PasswordResetCode.findOne({
        where: {
            passwordResetCode,
            createdAt: {
                [Op.gt]: expiryDate,
            },
        },
    })

    if (!userTokenObject) return null

    return userTokenObject
}

export const getDate = (type: string, date?: number) => {
    if (type === 'start') {
        return date ? new Date(date) : new Date(0)
    }
    return date ? new Date(date) : new Date()
}

interface EmailResponse {
    accepted: [UsersAttr['email']?]
    rejected: [[UsersAttr['email']?]]
    envelopeTime: number
    messageTime: number
    messageSize: number
    response: string
    envelope: {
        from: string
        to: [UsersAttr['email']]
    }
}

export const validateEmail = (email: UsersAttr['email']) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export const sendEmail = async (
    email: UsersAttr['email'],
    subject: string,
    text: string,
    html: string,
) => {
    const transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER,
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        },
    })

    const info: EmailResponse = await transporter.sendMail({
        from: process.env.SEND_EMAIL_FROM,
        to: email,
        subject,
        text,
        html,
    })
    return info
}

export const getRandomNumber = (length: number, chars: string) => {
    var data = ''
    if (chars.indexOf('a') > -1) data += 'abcdefghijklmnopqrstuvwxyz'
    if (chars.indexOf('A') > -1) data += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (chars.indexOf('#') > -1) data += '0123456789'
    if (chars.indexOf('!') > -1) data += '~!@#$%&*()_{}[]?'
    var result = ''
    for (var i = length; i > 0; --i) result += data[Math.floor(Math.random() * data.length)]
    return result
}
