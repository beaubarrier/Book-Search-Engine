const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    bookCount: Int
    savedBooks: [
        Book
    ]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!

  }

  type Auth {
    token: ID!
    user: User
    
  }

  type Mutation {
    createUser(userName: String!, email: String!, password:String!):Auth
    login(email:String!, password:String!):Auth
    savedBook(bookData:BookInput!):User
    deleteBook(bookID:ID!):User
   
  }
  type Query {
      me: User
  }
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;
