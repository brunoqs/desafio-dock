const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 400, 
            data: { errors: errors.array() } 
        })
    }
    next();
};

module.exports = {
    validatorMiddleware
}