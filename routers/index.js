const router = require('express').Router()

router.use('/api/v1/admin/users', require('./api/v1/admin/usersRoutes'))

module.exports = router
