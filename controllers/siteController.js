// const Site = require("../../models/Site");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AWS = require("aws-sdk");


//@route GET api/sites
//@description all sites
//@access public
async function getAllSites(req, res) {
  // GET ALL SITES - SELECT DETAILS
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const params = {
    TableName: "stay-tonight-atl-sites", //TABLE_NAME
    // ProjectionExpression: "siteName, phone, address, stateName, city, zipcode",
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
// }
// //@route POST api/sites
// //@description Create a site
// //@access private
// router.post("/", auth, (req, res) => {
//   const newSite = new Site({
//     name: req.body.name,
//   });
//   newSite.save().then((site) => res.json(site));
// });

// //@route DELETE api/sites/id
// //@description Delete a site
// //@access private
// router.delete("/:id", auth, (req, res) => {
//   Site.findById(req.params.id)
//     .then((site) => site.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

exports.getAllSites = getAllSites
