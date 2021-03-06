const router = require('express').Router()
const auth = require('../../../middleware/auth')
const HqDragonController = require('../../../../controllers/admin/HqragonController')

// GET ALL HQS IN SITE
router.get('/get-hqs', auth, HqDragonController.getHqs)
// UPDATE HQ DETAIL
router.get('/get-hq-detail/:numberOfHqs', auth, HqDragonController.UpdateHqDetail)

module.exports = router
