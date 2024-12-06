// Helper to handle standardized API responses
const createResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
      success: statusCode < 400,
      message,
      data,
    });
  };
  
  module.exports = createResponse;
  