const fs = require('fs');
const path = require('path')
const Article = require("../models/Article")

module.exports = {        
    getIndexPage: (req, res) => {
        Article.find({}, function(err, articles) {
            res.render("admin/index", {title:"Admin", articles: articles, })
        })
    },
    getAddArticlePage: (req, res) => {
        res.render('admin/add-article', { title: "Add Article", article: new Article(),  })
    },
    submitAddArticlePage: async (req, res, next) => {
        req.article = new Article()
        next()
    },
    getEditArticlePage: async (req, res) => {
        const article = await Article.findOne({ slug: req.params.slug })
        res.render('admin/edit-article', { title: "Edit Article", article: article,  })
    },

    submitEditArticlePage: async (req, res, next) => {
        req.article = await Article.findOne({ slug: req.params.slug })
        next()
    },
    deleteArticle: async (req, res) => {
        const article = await Article.findOne({ slug: req.params.slug }).remove()
        res.redirect('/')
    },
    saveArticleAndRedirect: (pageName) => {
        return async (req, res) => {
            let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
            article.img = {
                data: fs.readFileSync(path.join(__dirname, '..', 'public', 'uploads', req.file.filename)),
                contentType: 'image/png'
            }
            try {
                article = await article.save()
                res.redirect(`/articles/${article.slug}`)
            } catch (e) {
                res.render(pageName, { article: article, title: pageName,  })
            }
        }
    }
}
