const sendResponse = (res, message, data, statusCode = 200) => {
  // Decide response type based on status code
  const responseType =
    statusCode >= 200 && statusCode < 300 ? "success" : "error";

  const response = {
    status: responseType,
    message: message,
  };

  // If it's a success response and data is provided, add it to the response
  if (responseType === "success" && data) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

module.exports = sendResponse;
