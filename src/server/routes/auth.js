const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/register_login", (req, res, next) => {
    console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({
                id: user.id,
                email: user.email,
                username: "Joe Blow",
                img: "https://thispersondoesnotexist.com/"
            });
        });
    })(req, res, next);
});

router.post('/logout', function(req, res){
    req.logOut();
    req.session.destroy();
    res.send('logged out');
});

module.exports = router;