const AWS = require("aws-sdk");

// VALIDATION FOR LOGIN - GET ONE USER BY EMAIL
async function loginUser(email) {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-users",
    Key: email,
  };
  try {
    const user = await docClient.get(params).promise();
    return user.Item;
  } catch (err) {
    return err;
  }
}

// GET ONE USER BY ID
async function getUserById(emailId) {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    const params = {
      TableName: "stay-tonight-atl-users",
      Key: {email: `${emailId}`},
    };
    try {
      const user = await docClient.get(params).promise();
      return user.Item;
    } catch (err) {
      return err;
    }
  }

exports.loginUser = loginUser;
exports.getUserById = getUserById;
