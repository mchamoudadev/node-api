import Joi from "joi";

export const validateUserRegistration = (req, res, next) => {

    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.log("error details", error.details);
        return res.status(400).send(error.details[0].message);
    }

    next();

};