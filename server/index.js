const { GraphQLServer } = require('graphql-yoga');
const session = require('express-session');
const bcrypt = require('bcryptjs');
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

const data = {};

const resolvers = {
  Query: {
    isLogin: (parent, args, { request }) =>
      typeof request.session.user !== 'undefined',
  },
  Mutation: {
    signup: async (parent, { username, password }, context) => {
      if (data[username]) {
        throw new Error('Username already exists');
      }

      data[username] = {
        password: await bcrypt.hashSync(password, 10),
      };

      return true;
    },
  },
};

const context = ({ request }) => ({ request });

const server = new GraphQLServer({ typeDefs, resolvers, context });

server.express.use(
  session({
    name: 'qid',
    secret: `random-secret`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms('1d'),
    },
  })
);

server.start(() => console.log('Server is running on localhost:4000'));
