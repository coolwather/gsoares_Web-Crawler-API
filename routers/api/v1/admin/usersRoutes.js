const router = require('express').Router()
const validation = require('express-validation')
const UserController = require('../../../../controllers/admin/UserCOntroller')
const { UserValidation } = require('../../../../controllers/validations/admin/UserValidation')
const auth = require('../../../middleware/auth')

// LOGIN
router.post('/login', validation(UserValidation.login), UserController.login)
// CREATE A NEW USER
router.post('/', auth, validation(UserValidation.createUser), UserController.createUser)
// UPDATE USER
router.put('/', auth, validation(UserValidation.updateUser), UserController.updateUser)

module.exports = router
