const Site = require('../../models/Site')

class SiteService {
    static async create(name, url) {
        if(!await SiteService.SiteExists(url)) {
            const siteToCreate = Site.build({
                name,
                url
            })

            await siteToCreate.save()

            return siteToCreate
        } else {
            throw {errorCode: 'SITE_001', message: 'Site já cadastrado'}
        }
    }

    static async SiteExists(url, oldUrl = null) {
		if (oldUrl === null || url !== oldUrl) {
			const site = await Site.findOne({ where: { url } })

			if (site) {
				return true
			}

			return false
		}

		return false
	}
}

module.exports = SiteService
