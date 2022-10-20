const {check, validationResult} = require('express-validator');
const User = require("../../models/User")

exports.validateUser = [
  check('firstName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('First name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('lastName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Last name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail()
    .custom(value => {
        return User.findOne({email:value}).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
    })
    .bail(),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 8 characters required!')
    .bail(),
  check('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }    
        return true;
    })
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        res.render("default/signup", {title:"Signup", errors:errors.array() })
    next();
  },
];