function guest (req, res, next) {
    if(! req.isAuthenticated()){ 
        // we are getting isAuthenticated due to passport
        return next()
    }
    return res.redirect('/')
}

module.exports = guest;