const SiteService = require('../../services/admin/SiteService')

class SiteController {
    static async index(req, res, next) {
        try {
            const sites = await SiteService.GetAll()

            return res.status(200).send(sites)
        } catch(err) {
            next(err)
        }
    }

    static async getSite(req, res, next) {
        const { id } = req.params

        try {
            const site = await SiteService.GetSite(id)
        
            return res.status(200).send(site)
        } catch(err) {
            next(err)
        }
    }

	static async createSite(req, res, next) {
        const { name, url } = req.body

        try{
            const site = await SiteService.Create(name, url)

            res.status(201).send(site)
        } catch(err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        const { name, url, qtdHqs } = req.body
        const { id } = req.params

        try {
            const updatedSite = await SiteService.Update(name, url, qtdHqs, id)

            res.status(200).send(updatedSite)
        } catch(err){
            next(err)
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params

        try {
            await SiteService.Delete(id)

            return res.status(200).json({ delete: true })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = SiteController
