const {
  updateEnquiry
} = require('./controller/purchaseManagement/requirementEnquiry');

const res = {
  statusCode: 500,
  data: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    this.data = data;
    return this;
  }
};
const req = {
  body: {}
};
req.params = {
  id: 'E0001'
};
req.body.updateData = { data: 'abcd' };
req.body.status = {};
let err = 1;
const fn = updateEnquiry(req, res, () => {});

console.log(fn);
