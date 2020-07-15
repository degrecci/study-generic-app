const { GraphQLServer } = require('graphql-yoga');
const session = require('express-session');
const ms = require('ms');

const typeDefs = `
  type Query {
    isLogin: Boolean!
  }

  type Mutation {
    login(username: String!, password: String!): Boolean!
    signup(username: String!, password: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
    isLogin: (parent, args, { request }) =>
      typeof request.session.user !== 'undefined',
  },
};

const context = ({ request }) => ({ request });

const server = new GraphQLServer({ typeDefs, resolvers, context });

server.express.use(
  session({
    name: 'qid',
    secret: `some-random-secret-here`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms('1d'),
    },
  })
);

server.start(() => console.log('Server is running on localhost:4000'));
