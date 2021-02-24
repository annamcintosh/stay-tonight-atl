const auth = require("../middleware/auth");
const AWS = require("aws-sdk");
const { getSite, addSite, deleteSite } = require("../services/siteService");

//@route GET api/sites
//@description all sites
//@access public
async function allSitesController(req, res) {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-sites",
  };
  await docClient.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      const itemArray = data.Items;
      res.contentType("application/json");
      res.send(itemArray);
    }
  }
}

//@route GET api/sites/:siteId
//@description one site
//@access public
async function singleSiteController(req, res) {
  try {
    const site = await getSite(req.params.siteId);
    res.send(site);
  } catch (err) {
    return { error: err };
  }
}

//@route POST api/sites/add
//@description Create a site
//@access private
async function addOneSiteController(req, res) {
  try {
    const site = await addSite(req.body);
    res.send(site);
  } catch (err) {
    return { error: err };
  }
}

//@route POST api/sites/:siteId
//@description Update a site
//@access private
async function updateOneSiteController(req, res) {
  try {
    const site = await addSite(req.body);
    res.send(site);
  } catch (err) {
    return { error: err };
  }
}


//@route DELETE api/sites/:siteId
//@description Delete a site
//@access private
async function deleteOneSiteController(req, res) {
  try {
    const site = await deleteSite(req.params.siteId);
  } catch (err) {
    return { error: err }
  }
}

//EXPORTS
exports.allSitesController = allSitesController;
exports.singleSiteController = singleSiteController;
exports.addOneSiteController = addOneSiteController;
exports.updateOneSiteController = updateOneSiteController;
exports.deleteOneSiteController = deleteOneSiteController;