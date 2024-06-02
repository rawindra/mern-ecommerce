import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().max(30).required(),
});


export { create };