const router = require('express').Router()

router.use('/api/v1/admin/users', require('./api/v1/admin/usersRoutes'))
router.use('/api/v1/admin/sites', require('./api/v1/admin/sitesRoutes'))

module.exports = router
