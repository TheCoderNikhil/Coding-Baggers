const express = require('express');
const router = express.Router();

const { 
    getIndexPage,
    getAddArticlePage, 
    submitAddArticlePage, 
    getEditArticlePage, 
    submitEditArticlePage, 
    saveArticleAndRedirect, 
    deleteArticle, 
} = require("../controllers/adminController")

const upload = require("../config/upload")

const { isAdmin } = require("../config/auth")

router.all('*', isAdmin);

router.get("/", getIndexPage)

router.get('/articles/add', getAddArticlePage)
router.get('/articles/edit/:slug', getEditArticlePage)

router.post('/articles', upload.single("image"), submitAddArticlePage, saveArticleAndRedirect('admin/add-article'))
router.put('/articles/:slug', upload.single("image"), submitEditArticlePage, saveArticleAndRedirect('admin/edit-article'))

router.delete('/articles/:slug', deleteArticle)

module.exports = router;