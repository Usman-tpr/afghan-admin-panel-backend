const router = require("express").Router()
const upload = require("../config/multerConfig");
const { create , getAll , deleteVisit } = require("../controllers/visitController");

router.post("/" ,upload.single("image"), create)
router.get("/" , getAll)
router.delete("/:id" , deleteVisit)

module.exports = router