const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql `

input NewUser {
    id: Int
    email: String
    password: String
    firstName: String
    lastName: String
}

input NewPost {
    id: Int
    content: String
}

input UptadePost {
    content: String
}

input NewComment {
    id: Int
    content: String
    createdAt: String,
    updatedAt: String
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
    comments: [Post]
    content: String
    createdAt: String,
    updatedAt: String
}

type Query {
    users: [User]
    posts: [Post]
    getPost(id: Int): Post
    getCommentById(id: Int): [Post]
}


type Mutation {
    createUser(input: NewUser): User
    createPost(input: NewPost): Post
    updatePost(id: Int, input: UptadePost): Post
    deletePost(id: Int): Post
    createComment(id: Int, input: NewComment): [Post]
} 

`;

const users = [{
        id: 1,
        email: 'fawzy-elsam@outlook.fr',
        password: '12345',
        firstName: 'Fawzy',
        lastName: 'Elsam'
    },
    {
        id: 2,
        email: 'fawzy-elsam@outlook.fr',
        password: '12345',
        firstName: 'Fawzy',
        lastName: 'Elsam'
    }
];

const posts = [{

        id: 1,
        author: users,
        comments: [{
                id: 1,
                author: "user",
                content: "String",
                createdAt: "date1",
                updatedAt: "date2"
            },
            {
                id: 2,
                author: "user",
                content: "String",
                createdAt: "date1",
                updatedAt: "date2"
            },
            {
                id: 3,
                author: "user",
                content: "String",
                createdAt: "date1",
                updatedAt: "date2"
            }
        ],
        content: 'test0',
        createdAt: "2018 - 10 - 02",
        updatedAt: "2018 - 11 - 03",

    },
    {
        id: 2,
        author: users,
        comments: [{
            id: 1,
            author: "user",
            content: "String",
            createdAt: "date1",
            updatedAt: "date2"
        }],
        content: 'test0',
        createdAt: "2018 - 10 - 02",
        updatedAt: "2018 - 11 - 03",

    },
    {

        id: 3,
        author: users,
        comments: [{
            id: 1,
            author: "user",
            content: "String",
            createdAt: "date1",
            updatedAt: "date2"
        }],
        content: 'test0',
        createdAt: "2018 - 10 - 02",
        updatedAt: "2018 - 11 - 03",
    },
];

const resolvers = {

    Query: {
        users: () => users,
        posts: () => posts,
        getPost: (root, { id }) => ({
            posts
        }),
        getCommentById: (root, { id }) => {
            console.log(id, posts.filter(post => post.id === id))
            return posts.filter(post => post.id === id)[0].comments
        }

    },

    Mutation: {
        createUser: (root, { input }) => ({
            id: input.id,
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName
        }),
        createPost: (root, { input }) => ({
            id: input.id,
            content: input.content
        }),
        updatePost: (root, { id, input }) => ({
            content: input.content
        }),
        deletePost: (root, { id }) => ({
            posts
        }),
        createComment: (root, id, { input }) => ({
            id: input.id,
            author: input.author,
            comments: input.comments,
            content: input.content,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        }),
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});