const router = require('express').Router()
const auth = require('../../../middleware/auth')
const HqDragonController = require('../../../../controllers/admin/HqragonController')

// GET ALL HQS IN SITE
router.get('/get-hqs', auth, HqDragonController.getHqs)

module.exports = router
