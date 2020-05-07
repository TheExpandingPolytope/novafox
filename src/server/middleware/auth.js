function auth(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send("authentication required");
    }
}

module.exports = auth;