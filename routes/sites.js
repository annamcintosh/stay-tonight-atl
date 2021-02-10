const express = require("express");
const {
  allSitesController,
  singleSiteController,
  addOneSiteController,
  updateOneSiteController,
  deleteOneSiteController,
} = require("../controllers/siteController");

const router = express.Router();
router.get("/", allSitesController);
router.get("/:siteId", singleSiteController);
router.post("/add", addOneSiteController);
router.post("/:siteId", updateOneSiteController);
router.delete("/:siteId", deleteOneSiteController);

module.exports = router;
