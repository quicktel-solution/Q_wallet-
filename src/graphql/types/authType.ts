export default `
    type User {
        userId: ID!
        firstName: String
        lastName: String
        fullName: String
        email: String
        phoneNumber: String
      }

    type Auth {
        user: User
        token: String
        msg: String!
        success: Boolean!
    }

    type Query {
        getUser: User
    }

    type Mutation {
        signup(
            firstName: String!
            lastName: String!
            email: String!
            phoneNumber: String!
            password: String!
        ): Auth!

        login(
            email: String!
            password: String!
        ): Auth!
    
        resetPassword(
            email: String!
        ): Auth!

        confirmResetCode(
            passwordResetCode: String!
        ): Auth!

        createNewPassword(
            newPassword: String!
            passwordResetCode: String
     ): Auth
}
`
