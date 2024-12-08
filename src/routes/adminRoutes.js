const router = require("express").Router()
const { createUser , loginUser , getUser , getMembers } = require("../controllers/adminController");
const auth = require('../middlewares/auth')
router.post("/create" , createUser)
router.post("/" , loginUser)
router.get("/get" ,auth, getUser)
router.get("/get-members" ,auth, getMembers)

module.exports = router