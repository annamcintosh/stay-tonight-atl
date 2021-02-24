const AWS = require("aws-sdk");

// // GET ONE USER
// async function getUser(email) {
//     const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
//     const params = {
//       TableName: "stay-tonight-atl-users",
//       Key: { email: `${email}` },
//     };
//     try {
//       const user = await docClient.get(params).promise();
//       console.log("user in getuser:", user)
//       return err;
//     } catch (err) {
//       return err;
//     }
//   }

// ADD ONE USER
async function addUser(newUser) {
    console.log("addUserNewUser=", newUser)
    const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    const params = {
      TableName: "stay-tonight-atl-users",
      Item: newUser,
    };
    try {
      const data = await docClient.put(params).promise();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }


//   exports.getUser = getUser;
  exports.addUser = addUser;

