const Counter = require('../model/counter');
// const catchAsync = require("./catchAsync");

module.exports = (entityName, size, startingSequence) => {
  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
  };

  return async function(next) {
    try {
      let counter = await Counter.findByIdAndUpdate(
        { _id: entityName },
        { $inc: { seq: 1 } },
        { new: true }
      );

      if (!counter) counter = await Counter.create({ _id: entityName });

      let value = '';
      if (startingSequence) value = startingSequence + pad(counter.seq, size);
      else value = entityName.toUpperCase().charAt(0) + pad(counter.seq, size);
      // eslint-disable-next-line no-underscore-dangle
      this._id = value;
      this[`${entityName}No`] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};
