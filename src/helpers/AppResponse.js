const AppResponse = {};

AppResponse.success = (res, data, message) => {
  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: message || 'Request was successful',
    data: data || null,
  });
}

AppResponse.error = (res, error, message) => {
  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    error: error || 'Internal Server Error',
    message: message || 'An error occurred',
  });
}

AppResponse.notFound = (res, message) => {
  return res.status(404).json({
    status: 'error',
    statusCode: 404,
    error: 'Not Found',
    message: message || 'Resource not found',
  });
}

AppResponse.unauthorized = (res, message) => {
  return res.status(401).json({
    status: 'error',
    statusCode: 401,
    error: 'Unauthorized',
    message: message || 'Unauthorized access',
  });
}

AppResponse.badRequest = (res, message) => {
  return res.status(400).json({
    status: 'error',
    statusCode: 400,
    error: 'Bad Request',
    message: message || 'Bad request',
  });
}

module.exports = AppResponse;





// class AppResponse {
//   static send(res, statusCode, status, message, data = null, error = null) {
//     return res.status(statusCode).json({
//       status,
//       statusCode,
//       message,
//       data,
//       error,
//     });
//   }

//   static success(res, data, message = 'Request was successful') {
//     return this.send(res, 200, 'success', message, data);
//   }

//   static error(res, error = 'Internal Server Error', message = 'An error occurred') {
//     return this.send(res, 500, 'error', message, null, error);
//   }

//   static notFound(res, message = 'Resource not found') {
//     return this.send(res, 404, 'error', message, null, 'Not Found');
//   }

//   static unauthorized(res, message = 'Unauthorized access') {
//     return this.send(res, 401, 'error', message, null, 'Unauthorized');
//   }

//   static badRequest(res, message = 'Bad request') {
//     return this.send(res, 400, 'error', message, null, 'Bad Request');
//   }
// }

// module.exports = AppResponse;
