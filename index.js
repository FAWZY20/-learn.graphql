const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql `

input NewUser {
    id: Int
    email: String
    password: String
    firstName: String
    lastName: String
}


type User{
  id: Int 
  email: String
  password: String
  firstName: String
  lastName: String
}

type Post {
    id: Int
    author: User
    comments: Post
    content: String
    #createdAt: Date
    #updatedAt: Date
}

type Query {
    users: [User]
    posts: [Post]
}

type Mutation {
    createUser(input: NewUser): User
} 

`;



const users = [{
    id: 1,
    email: 'fawzy-elsam@outlook.fr',
    password: '12345',
    firstName: 'Fawzy',
    lastName: 'Elsam'
}, ];

const posts = [{

    id: 1,
    author: users,
    comments: [],
    content: 'test',
    createdAt: 2018 - 10 - 02,
    updatedAt: 2018 - 11 - 03,

}, ];

const resolvers = {
    Query: {
        users: () => users,
        posts: () => posts
    },
    Mutation: {
        createUser: (root, { input }) => ({
            id: input.id,
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName
        })
    }
};



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});