const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId:process.env.ACCESS_KEY,
    secretAccessKey:process.env.SECRET_KEY,
    region: 'us-east-2',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = (recipientEmail,data, name) => {
    let params = {
      Source:"devtestacp@gmail.com",
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: data,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
}
module.exports = {
  sendEmail
};