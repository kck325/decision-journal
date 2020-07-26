/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDecision = /* GraphQL */ `
  query GetDecision($id: ID!) {
    getDecision(id: $id) {
      id
      decision
      size
      checkDate
      createdAt
      updatedAt
    }
  }
`;
export const listDecisions = /* GraphQL */ `
  query ListDecisions(
    $filter: ModelDecisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDecisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        decision
        size
        checkDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
