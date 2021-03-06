const HqDragonService = require('../../services/admin/HqDragonService')

class HqDragonController {
	static async getHqs(req, res, next) {
		try {
			const hqs = await HqDragonService.GetHqs()

			res.status(200).send(hqs)
		} catch (err) {
			next(err)
		}
	}

	static async UpdateHqDetail(req, res, next) {
		const { numberOfHqs } = req.params
        
        try {
            const hqs = await HqDragonService.GetAllHqsToUpdateDetail()

            for(let i = 0; i < numberOfHqs; i++) {
                await HqDragonService.GetHqDetail(hqs[i].id)
            }

            return res.status(200).send()

        } catch(err) {
            next(err)
        }
	}
}

module.exports = HqDragonController
