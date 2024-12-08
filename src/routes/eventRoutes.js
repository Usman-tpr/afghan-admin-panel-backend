const router = require("express").Router()
const upload = require("../config/multerConfig");
const { create , getAll , deleteEvent , updateEvent } = require("../controllers/eventController");

router.post("/" ,upload.single("image"), create)
router.get("/" , getAll)
router.delete("/:id" , deleteEvent)

module.exports = router