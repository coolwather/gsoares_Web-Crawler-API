const router = require('express').Router()
const validation = require('express-validation')
const SiteController = require('../../../../controllers/admin/SiteController')
const { SiteValidation } = require('../../../../controllers/validations/admin/SiteValidation')
const auth = require('../../../middleware/auth')

router.post('/', auth, validation(SiteValidation.create), SiteController.createSite)

module.exports = router
