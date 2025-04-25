import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../graphql/schema'
import resolvers from '../../graphql/resolver'
import prisma from '../../lib/prisma'
import Cors from 'micro-cors'

const cors = Cors()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma }
})

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
