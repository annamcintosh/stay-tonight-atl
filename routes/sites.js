const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Site Model
const Site = require('../../models/Site');

//@route GET api/sites
//@description all sites
//@access public
router.get('/', (req, res) => {
  Site.find()
    .sort({ date: -1 })
    .then((sites) => res.json(sites));
});

//@route POST api/sites
//@description Create a Post
//@access private
router.post('/', auth, (req, res) => {
  const newSite = new Site({
    name: req.body.name,
  });
  newSite.save().then((site) => res.json(site));
});

//@route POST api/sites
//@description Create a Post
//@access private
router.delete('/:id', auth, (req, res) => {
  Site.findById(req.params.id)
    .then((site) => site.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
