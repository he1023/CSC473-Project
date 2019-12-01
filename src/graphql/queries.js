/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
    id
    Title
    Thumbnail
    Location
    Difficulty
    Capacity
    Story
    TimeLimit
    Players
    Finished
    Total_Questions
    Total_Hints
    Questions
    AtQuestion
    QuestionVisualAid
    Hints
    GeoLocation
    AnswerType
    Answers
    Rating
    Review
    AidStuffs
  }
}
`;
export const listGames = `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Title
      Thumbnail
      Location
      Difficulty
      Capacity
      Story
      TimeLimit
      Players
      Finished
      Total_Questions
      Total_Hints
      Questions
      AtQuestion
      QuestionVisualAid
      Hints
      GeoLocation
      AnswerType
      Answers
      Rating
      Review
      AidStuffs
    }
    nextToken
  }
}
`;
