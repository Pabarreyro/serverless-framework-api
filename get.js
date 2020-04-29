import handler from './lib/handler';
import dynamoDb from './lib/dynamoDb';

export const singleNote = handler(async (event, context) => {
  let result;
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the note being retrieved
    // - 'userId': Idetnity Pool identity id of authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    result = await dynamoDb.get(params);
  } catch (e) {
    throw e;
  }

  if (!result.Item) {
    throw new Error('Item not found.');
  }

  return result.Item;
});
