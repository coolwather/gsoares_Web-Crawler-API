const SiteService = require('../../services/admin/SiteService')

class SiteController {
	static async createSite(req, res, next) {
        const { name, url } = req.body

        try{
            const site = await SiteService.create(name, url)

            res.status(201).send(site)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = SiteController
