const respond = (res, statusCode, data, message, results, status) => {
  const statusMsg = status || 'success';
  return res.status(statusCode).json({
    status: statusMsg,
    results,
    data: {
      data
    },
    message
  });
};

module.exports = respond;
