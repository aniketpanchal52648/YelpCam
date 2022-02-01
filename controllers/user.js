const user = require('../models/user');
module.exports.renderPage = (req, res) => {
    res.render('user')
};
module.exports.postRegisterRequest = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newuser = new user({ username, email });
        const registerUser = await user.register(newuser, password);
        // console.log(registerUser);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'register ');
            res.redirect('/campground');

        }
        )
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('campground')
    }
}