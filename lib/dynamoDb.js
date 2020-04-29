import AWS from "aws-sdk";

const dbClient = new AWS.DynamoDB.DocumentClient();

export default {
  get: params => dbClient.get(params).promise(),
  put: params => dbClient.put(params).promise(),
  query: params => dbClient.query(params).promise(),
  update: params => dbClient.update(params).promise(),
  delete: params => dbClient.delete(params).promise()
};
