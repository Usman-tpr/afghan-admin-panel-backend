const router = require("express").Router()
const { createUser , loginUser } = require("../controllers/adminController");

router.post("/" , createUser)
router.get("/" , loginUser)

module.exports = router