const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)

const SiteValidation = {
    create: {
        body: {
            name: Joi.string().required().error(err => {
                return {
                    message: 'O nome é obrigatório'
                }
            }),
            url: Joi.string().uri().error(err => {
                switch(err[0].type) {
                    case 'any.required':
                        return 'A url é obrigatória'
                    case 'string.uri':
                        return 'Favor enviar uma url válida'
                    default:
                        return 'A url é obrigatória'
                }
            })
        }
    },
    update: {
        body: {
            name: Joi.string().required().error(err => {
                return {
                    message: 'O nome é obrigatório'
                }
            }),
            url: Joi.string().uri().error(err => {
                switch(err[0].type) {
                    case 'any.required':
                        return 'A url é obrigatória'
                    case 'string.uri':
                        return 'Favor enviar uma url válida'
                    default:
                        return 'A url é obrigatória'
                }
            })
        }
    }
}

module.exports = {
    SiteValidation
}