
// Import required AWS SDK clients and commands for Node.js
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "us-east-1"; //e.g. "us-east-1"

//GET ONE ITEM
// Set the parameters
const params = {
    TableName: "stay-tonight-atl-sites", //TABLE_NAME
    Key: {
      siteId: { S: '1' },
    },
    ProjectionExpression: "zipcode",

  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    const data = await dbclient.send(new GetItemCommand(params));
    console.log("Success", data.Item);
  };
  run();
