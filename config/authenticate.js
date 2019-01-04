const authenticationWrapper = {
    checkIfLoggedIn: function checkIfLoggedIn(req, res, next) {
        if (req.user && req.user.email) {
            next();
        }
        else if (req.originalUrl == '/tt/mainDashboard') {
            req.session.currentPath = req.originalUrl;
            //res.redirect('tt/mainDashboard');
            res.redirect('/tt/saml/login');
        } else {
            res.status(401).json({
                "error": "Not Authenticated"
            });
        }
    },
    authenticateUser: function authenticateUser(req, res, next) {
       if (req.user && req.user.email) {
            res.redirect('tt/mainDashboard');
        }
        next();
    }
};

module.exports = authenticationWrapper;
