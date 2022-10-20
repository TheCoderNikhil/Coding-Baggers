const passport = require("passport")
const Article = require("../models/Article")
const User = require("../models/User")
const { hashPassword } = require("../config/customFunctions")
const {mailTransporter} = require("../config/nodemailer")

module.exports = {
    getIndexPage: async (req, res) => {
        const { page = 1, limit = 5 } = req.query;

        const articles = await Article.find()
            .sort([['_id', -1]])
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Article.countDocuments();

        res.render("default/index", {
            title: "Home",
            articles: articles,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    },
    getAboutPage: (req, res) => {
        res.render("default/about", { title: "About" })
    },

    getArticlePage: async (req, res) => {
        const article = await Article.findOne({ slug: req.params.slug })
        if (article == null) res.redirect('/')
        res.render('default/singleArticle', { title: article.title, article: article })
    },

    getContactPage: (req, res) => {
        res.render("default/contact", { title: "Contact" })
    },

    submitContactPage: async (req, res) => {
        const {name, phone, email, message} = req.body
        let info = await mailTransporter.sendMail({
            from: '<admin@codewithnikhil.com>', 
            to: "nikhilgargcoder@gmail.com", 
            subject: "Contact From CodewithNikhil", 
            html:`<h3>Name:${name}</h3><h3>Email:${email}</h3><h3>Phone:${phone}</h3><h3>Message:${message}</h3> `
        });
        req.flash("success", "Successfully Submitted!")
        res.redirect("/contact")

    },

    getLoginPage: (req, res) => {
        res.render("default/signin", { title: "Signin" })
    },

    getSignupPage: (req, res) => {
        res.render("default/signup", { title: "Signup" })
    },

    submitLoginPage: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    },

    submitSignupPage: async (req, res) => {
        const { firstName, lastName, email, password, confirmPassword } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, admin: 0 });
        await newUser.save();
        res.redirect("/login")
    },

    logout: (req, res) => {
        req.logout();
        res.redirect("/login")
    }
}