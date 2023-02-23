const { gql } = require("apollo-server-express");

const UserTypes = gql`
  scalar Upload
  
  type User {
    id: ID
    email: String
    password: String
    username: String
    avatarUrl: String
  }

  input SignUpInput{
    email: String
    password: String
    username: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type AuthData{
    user: User,
    token: String
  }
`;

module.exports = UserTypes;
