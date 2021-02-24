const AWS = require("aws-sdk");

// GET ONE USER
async function getUser(email) {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-users",
    Key:  email ,
  };
  try {
    console.log(params);
    const user = await docClient.get(params).promise();
    console.log("user in getuser:", user);
    return user.Item;
  } catch (err) {
    throw err;
  }
}

// // GET ONE USER
// async function getUser(email) {
//   const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
//   const params = {
//     TableName: "stay-tonight-atl-users",
//     Key: { email: `${email}` },
//   };
//   // try {
//   await docClient.get(params, function (err, data) {
//     if (err) {
//       console.error(
//         "Unable to read item. Error JSON:",
//         JSON.stringify(err, null, 2)
//       );
//     } else {
//       console.log("GetItem succeeded:", JSON.stringify(data), email);
//     }
//   });
// }

// // ADD ONE USER
// async function addUser(newUser) {
//     console.log("addUserNewUser=", newUser)
//     const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
//     const params = {
//       TableName: "stay-tonight-atl-users",
//       Item: newUser,
//     };
//     try {
//       const data = await docClient.put(params).promise();
//       console.log(newUser);
//       return newUser;
//     } catch (err) {
//       console.error(err);
//     }
//   }

exports.getUser = getUser;
