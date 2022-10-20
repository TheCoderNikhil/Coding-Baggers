module.exports = {
    isUser:(req, res, next) =>{
        if(req.isAuthenticated()){
            next()
        }
        else{
            req.flash("danger", "Please login to continue!");
            res.redirect("/login")
        }
    },
    isAdmin:(req, res, next) =>{
        if(req.isAuthenticated() && res.locals.user.admin == 1){
            next()
        }
        else{
            req.flash("danger", "Please login as admin to continue!");
            res.redirect("/login")
        }
    }
}