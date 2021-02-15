const router = require('express').Router()
const validation = require('express-validation')
const UserController = require('../../../../controllers/admin/UserCOntroller')
const { UserValidation } = require('../../../../controllers/validations/admin/UserValidation')
const auth = require('../../../middleware/auth')

// CREATE A NEW USER
router.post('/', validation(UserValidation.createUser), UserController.createUser)

module.exports = router
