const router = require("express").Router();
const storesRouter = require("./stores.js");

router.get("/", (req, res) => res.redirect("/stores"));
router.use("/stores", storesRouter);
module.exports = router;
