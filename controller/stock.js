const express = require('express')
const router = express.Router()
const {getStockes, fetchStocksAccToQuery}=require('../routes/getStockes')
const {addRegisterUser, authenticateLoginUser} = require('../routes/registerLogin')
const {authentication} = require('../middleware/authentication')

router.get("/syncStock", authentication, getStockes)
router.get("/findStock", authentication, fetchStocksAccToQuery)
router.post("/registeruser",addRegisterUser)
router.post("/loginuser",authenticateLoginUser)

module.exports=router