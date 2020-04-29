import handler from './lib/handler';
import dynamoDb from './lib/dynamoDb';

export const allNotes = handler(async (event, context) => {
  let result;
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    result = await dynamoDb.query(params);
  } catch (e) {
    throw e;
  }

  return result.Items;
});
