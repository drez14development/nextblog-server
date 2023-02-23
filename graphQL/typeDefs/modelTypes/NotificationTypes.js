const { gql } = require("apollo-server-express");

const NotificationTypes = gql`
  scalar Date

  type Notification {
    id: ID
    actor: User
    receiver: User
    message: String
    refExcerpt: String
    postUrl: String
    wasRead: Boolean
  }

`;

module.exports = NotificationTypes;
