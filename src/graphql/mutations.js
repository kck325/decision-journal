/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDecision = /* GraphQL */ `
  mutation CreateDecision(
    $input: CreateDecisionInput!
    $condition: ModelDecisionConditionInput
  ) {
    createDecision(input: $input, condition: $condition) {
      id
      decision
      size
      checkDate
      createdAt
      updatedAt
    }
  }
`;
export const updateDecision = /* GraphQL */ `
  mutation UpdateDecision(
    $input: UpdateDecisionInput!
    $condition: ModelDecisionConditionInput
  ) {
    updateDecision(input: $input, condition: $condition) {
      id
      decision
      size
      checkDate
      createdAt
      updatedAt
    }
  }
`;
export const deleteDecision = /* GraphQL */ `
  mutation DeleteDecision(
    $input: DeleteDecisionInput!
    $condition: ModelDecisionConditionInput
  ) {
    deleteDecision(input: $input, condition: $condition) {
      id
      decision
      size
      checkDate
      createdAt
      updatedAt
    }
  }
`;
