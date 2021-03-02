const router = require('express').Router()
const validation = require('express-validation')
const SiteController = require('../../../../controllers/admin/SiteController')
const { SiteValidation } = require('../../../../controllers/validations/admin/SiteValidation')
const auth = require('../../../middleware/auth')

// GET ALL SITES
router.get('/', auth, SiteController.index)
// GET A SITE BY ID
router.get('/:id', auth, SiteController.getSite)
// CREATE A NEW SITE
router.post('/', auth, validation(SiteValidation.create), SiteController.createSite)
// UPDATE A SITE BY ID
router.patch('/:id', auth, validation(SiteValidation.update), SiteController.update)
// DELETE SITE
router.delete('/:id', auth, SiteController.delete)

module.exports = router
