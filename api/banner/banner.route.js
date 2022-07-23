const bannerControllers = require("./banner.controller");
const router = require("express").Router();

router.get("/", bannerControllers.getAllBanner);
router.get("/:id", bannerControllers.getSingleBanner);
router.post("/", bannerControllers.addNewBanner);
router.delete("/:id", bannerControllers.deleteBanner);
router.put("/:id", bannerControllers.updateBanner);

module.exports = router;
