import handler from './lib/handler';
import dynamoDb from './lib/dynamoDb';

export const singleNote = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await dynamoDb.delete(params);
    return { status: true };
  } catch (e) {
    throw e;
  }
});
