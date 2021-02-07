const express = require("express");
const { getAllSites } = require("../controllers/siteController");

const router = express.Router();

router.get("/", getAllSites);
// router.get("/:id", getOneSite);
// router.post("/add", addOneSite);
// router.post("/:id", updateOneSite);
// router.delete("/:id", deleteOneSite);

module.exports = router;
