import path from 'path'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import express from 'express'
import cors from 'cors'
// import { sequelize } from '../src/config/db'

import { config } from 'dotenv'
config({
    path: path.join(__dirname, '../.env'),
})

const port = process.env.PORT || 5000

const app = express()
app.use(cors())

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import { ErrorHandler, errorMiddleware } from './middleware/errorHandler'

const apolloserver = new ApolloServer({
    schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers })),
    context: async ({ req }) => {
        const token = req.headers.authorization || null
        // const user = await isAuthenticated(token)
        // user.passwordResetToken = token
        // return user
    },
    formatError(error) {
        if (process.env.NODE_ENV === 'production') {
            return error.originalError instanceof ErrorHandler
                ? errorMiddleware(error.originalError)
                : new ErrorHandler('Something went wrong!')
        }
        return error
    },
})

// sequelize.sync()

apolloserver.applyMiddleware({ app, path: '/graphql' })

app.listen(port, async () => {
    try {
        // await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
    console.log('listening on port ' + port)
})















// import path from 'path'
// import { ApolloServer } from 'apollo-server-express'
// import express from 'express'
// import cors from 'cors'
// import { sequelize } from '../src/config/db'

// import { config } from 'dotenv'
// config({
//     path: path.join(__dirname, '../.env'),
// })

// const port = process.env.PORT || 5000

// const app = express()
// app.use(cors())

// import resolvers from './graphql/resolvers'
// import typeDefs from './graphql/typeDefs'

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// })

// server.applyMiddleware({ app, path: '/graphql' })

// sequelize.sync()
// app.listen(port, async () => {
//     try {
//         await sequelize.authenticate()
//         console.log('Connection has been established successfully.')
//     } catch (error) {
//         console.error('Unable to connect to the database:', error)
//     }
//     console.log('listening on port ' + port)
// })
