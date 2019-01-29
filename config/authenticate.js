
exports.checkAuth = function(req, res, next) {

    console.log("user id. "+req.session.user_id);
    if (!req.session.user_id) {
        res.render('error.ejs', {});
    } else {
        next();

    }
}
