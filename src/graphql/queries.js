import { gql } from "@apollo/client";
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        cursor
        node {
          description
          forksCount
          id
          language
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          fullName
          stargazersCount
        }
      }
    }
  }
`;
export const ME = gql`
query  {
  me {
    id
    username
  }
}`;