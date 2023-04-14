import { gql } from "@apollo/client";
export const GET_REPOSITORIES = gql`
  query (
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
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
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      description
      forksCount
      fullName
      id
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
export const ME = gql`
  query {
    me {
      id
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repositoryId
          }
        }
      }
    }
  }
`;
