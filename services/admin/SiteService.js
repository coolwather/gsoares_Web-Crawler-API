const Site = require('../../models/Site')

class SiteService {
	static async GetAll() {
		const sites = await Site.findAll({ order: [['name', 'ASC']] })
		const sitesToReturn = sites.map((site) => site.getSite())

		return sitesToReturn
	}

	static async GetSite(id) {
		const site = await Site.findByPk(id)

		if (site) {
			return site.getSite()
		} else {
			throw { errorCode: 'SITE_002', message: 'Site não encontrado' }
		}
	}

	static async Create(name, url) {
		if (!(await SiteService.SiteExists(url))) {
			const siteToCreate = Site.build({
				name,
				url,
			})

			await siteToCreate.save()

			return siteToCreate
		} else {
			throw { errorCode: 'SITE_001', message: 'Site já cadastrado' }
		}
	}

	static async Update(name, url, qtdHqs, id) {
		const site = await Site.findByPk(id)

		if (site) {
            if(site.url !== url) {
                if(await SiteService.SiteExists(url, site.url)) {
                    throw { errorCode: 'SITE_001', message: 'Site já cadastrado' }
                }
            }

            site.name = name
            site.url = url
            site.qtdHqs = qtdHqs || 0
            site.dateLastUpdate = new Date()

            await site.save()

            return site
		} else {
			throw { errorCode: 'SITE_002', message: 'Site não encontrado' }
		}
	}

    static async Delete(id) {
        const site = await Site.findByPk(id)

        if(site) {
            await site.destroy()

            return true
        } else {
            throw { errorCode: 'SITE_002', message: 'Site não encontrado' }
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
