const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)

const UserValidation = {
    createUser: {
        body: {
            name: Joi.string().required().error(err => {
                return {
                    message: 'O nome é obrigatório'
                }
            }),
            email: Joi.string().required().email().error(err => {
                switch(err[0].type) {
                    case 'any.required':
                        return 'O e-mail é obriigatório'
                    case 'string.email':
                        return 'Favor preencher um e-mail válido'
                    default:
                        return 'O e-mail é obrigatório'
                }
            }),
            password: Joi.string().required().error(err => {
                return {
                    message: 'A senha é obrigatória'
                }
            })
        }
    }
}

module.exports = {
    UserValidation
}