import Joi from "joi";

export const validatePostRegistration = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().min(5).max(250).required(),

        content: Joi.string().min(10).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.log("error details", error.details);
        return res.status(400).send(error.details[0].message);
    }

    next();

};