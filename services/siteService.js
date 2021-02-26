const AWS = require("aws-sdk");

// GET ONE SITE
async function getSite(siteId) {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-sites",
    Key: { siteId: `${siteId}` },
  };
  try {
    const data = await docClient.get(params).promise();
    return data.Item;
  } catch (err) {
    return err;
  }
}

// ADD ONE SITE & UPDATE ONE SITE
async function addSite(siteInfo) {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-sites",
    Item: siteInfo,
  };
  try {
    const data = await docClient.put(params).promise();
    return siteInfo;
  } catch (err) {
    console.error(err);
  }
}

// DELETE ONE SITE
async function deleteSite(siteId) {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-sites",
    Key: { siteId: `${siteId}` },
  };
  try {
    const data = await docClient.delete(params).promise();
    return siteId;
  } catch (err) {
    return err;
  }
}

// EXPORTS
exports.getSite = getSite;
exports.addSite = addSite;
exports.deleteSite = deleteSite;
