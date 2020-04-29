export default function handler(lambda) {
  return function (event, context) {
    return Promise.resolve() // (Lambdas passed in may or may not operate async)
      .then(() => lambda(event, context)) // Run Lambda
      .then(resBody => [200, resBody]) // on success
      .catch(err => [500, { error: err.message}]) // on failure
      .then(([statusCode, body]) => ({ // return HTTP res
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
      }));
  };
}