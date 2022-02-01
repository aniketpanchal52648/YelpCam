module.exports.renderLoginPage = (req, res) => {
    res.render('login');

}
module.exports.sendLoginRequest = async (req, res) => {
    req.flash('success', 'welcome!!');
    // const Url=req.originalUrl;
    const Url = req.session.returnTo;
    res.redirect(Url);
};

module.exports.logout=(req,res)=>{
    req.logOut();
    req.flash('success',"goodbye!");
res.redirect('/campground');
}