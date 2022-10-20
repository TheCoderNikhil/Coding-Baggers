const express = require('express');
const router = express.Router()

const {
    getIndexPage,
    getContactPage,
    submitContactPage,
    getAboutPage,
    getArticlePage,
    getLoginPage,
    submitLoginPage,
    getSignupPage,
    submitSignupPage,
    logout
} = require('../controllers/defaultController')
const {
    validateUser,
  } = require('../middlewares/validators/userValidator')
  
router.get('/', getIndexPage)

router.get('/login', getLoginPage)
router.get('/logout', logout)

router.route("/signup")
  .post(validateUser, submitSignupPage)
  .get(getSignupPage)

router.post('/login', submitLoginPage);

router.get('/about', getAboutPage)

router.get('/articles/:slug', getArticlePage)

router.route('/contact')
    .get(getContactPage)
    .post(submitContactPage)

module.exports = router