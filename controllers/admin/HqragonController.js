const HqDragonService = require('../../services/admin/HqDragonService')

class HqDragonController {
    static async getHqs(req, res, next) {
        try {
            const hqs = await HqDragonService.GetHqs()

            res.status(200).send(hqs)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = HqDragonController