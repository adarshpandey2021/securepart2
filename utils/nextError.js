const AppError = require('./appError');

const nextError = (next, message, errorCode) => {
  const code = errorCode || 400;
  return next(new AppError(message, code));
};

module.exports = nextError;
