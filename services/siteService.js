// const AWS = require("aws-sdk");

// // const REGION = "us-east-1";
// // const dbclient = new AWS.DynamoDB.DocumentClient({ region: REGION });


// // GET ALL SITES - SELECT DETAILS
// async function getAllSitesAWS(req, res) {
//     // GET ALL SITES - SELECT DETAILS
//     const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
//     const params = {
//       TableName: "stay-tonight-atl-sites", //TABLE_NAME
//       ProjectionExpression: "siteName, phone, address, stateName, city, zipcode",
//     };
//     await docClient.scan(params, onScan);
  
//     function onScan(err, data) {
//       if (err) {
//         console.error(
//           "Unable to scan the table. Error JSON:",
//           JSON.stringify(err, null, 2)
//         );
//       } else {
//         const itemArray = data.Items;
//         res.contentType("application/json");
//         res.send(itemArray);
//       }
//     }
//   }


// // // GET ONE SITE
// // const getOneSiteAWS = async () => {
// //   const params = {
// //     TableName: "stay-tonight-atl-sites", //TABLE_NAME
// //     Key: {
// //       siteId: { S: "4" },
// //     },
// //     ProjectionExpression: "siteName",
// //   };
// //   const data = await dbclient.send(new GetItemCommand(params));
// //   console.log("Success", data.Item);
// // };

// // // ADD ONE SITE
// // const addOneSiteAWS = async () => {
// //   const params = {
// //     TableName: "stay-tonight-atl-sites",
// //     Item: siteSchema,
// //   };
// //   try {
// //     const data = await dbclient.send(new PutItemCommand(params));
// //     console.log(data);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// // // UPDATE ONE SITE
// // const updateOneSiteAWS = async () => {
// //   const params = {
// //     TableName: "stay-tonight-atl-sites",
// //     Key: {
// //       siteId: "4",
// //     },
// //     // Define expressions for the new or updated attributes
// //     UpdateExpression: "set siteName = :s", // For example, "'set Title = :t, Subtitle = :s'"
// //     // Convert the attribute JavaScript object you are deleting to the required DynamoDB format
// //     ExpressionAttributeValues: {
// //       ":s": "UPDATED NAME", // For example " ':s' : 'NEW_SUBTITLE'"
// //     },
// //   };
// //   try {
// //     const data = await dbclient.send(new PutItemCommand(params));
// //     console.log(data);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// // // DELETE ONE SITE
// // const deleteOneSiteAWS = async () => {
// //   const params = {
// //     TableName: "stay-tonight-atl-sites",
// //     Key: {
// //       siteId: { S: "4" },
// //     },
// //   };
// //   try {
// //     const data = await dbclient.send(new DeleteItemCommand(params));
// //     console.log("Success, item deleted", data);
// //   } catch (err) {
// //     if (err && err.code === "ResourceNotFoundException") {
// //       console.log("Error: Item not found");
// //     } else if (err && err.code === "ResourceInUseException") {
// //       console.log("Error: Item in use");
// //     }
// //   }
// // };

// module.exports = getAllSitesAWS
// //   getOneSiteAWS,
// //   addOneSiteAWS,
// //   updateOneSiteAWS,
// //   deleteOneSiteAWS};
