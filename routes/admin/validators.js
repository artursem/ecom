const { check } = require('express-validator');
const usersRepo = require('../../repositories');

module.exports = {
    requireEmail:   check('email')
                    .trim()
                    .normalizeEmail()
                    .isEmail()
                    .custom(async (email) => {
                        const existingUser = await usersRepo.getOneBy({ email });
                        if (existingUser) {
                            throw new Error('Email in use');
                        }
                    }),

    requirePassword: check('password')
                    .trim()
                    .isLength({min: 4, max: 20}),

    requirePasswordconfirmation: check('passwordconfirmation')
                                .trim()
                                .isLength({min: 4, max: 20})
                                .custom((passwordconfirmation, { req }) => {
                                    if (passwordconfirmation !== req.body.password) {
                                        throw new Error('Passwords must match');
                                    }
                                }),
};