const yelpcamp = require('../models/campground');
module.exports.renderCampground=async (req, res) => {
    const campground = await yelpcamp.find({});
    
    res.render('campground', { campground });
};
module.exports.renderNewCampground=(req, res) => {
    res.render('new');
}

module.exports.makeNewCampground=async (req, res, next) => {

    const data = new yelpcamp(req.body);
    data.image=req.files.map(f=> ({url:f.path,filename:f.filename}));
    data.author=req.user._id;
//    console.log(data.image);
    await data.save();
    req.flash('success',"Uploaded campground")
    res.redirect(`/campground/${data._id}`);

}
module.exports.deleteCampground=async (req, res) => {
    await yelpcamp.findByIdAndDelete(req.params.id);
    // const campground = await yelpcamp.find({});
    req.flash('success',"Deleted campground")
    res.redirect('/campground');

}

module.exports.getCampground=async (req, res) => {
    const campg = await yelpcamp.findById(req.params.id).populate('review').populate('author');
    if(!campg){
        req.flash('error',"Campground cannot found");
        return res.redirect('/campground')
    }
    
    res.render('show', { campg });
}
module.exports.renderEditCampground=async (req, res) => {
    const element = await yelpcamp.findById(req.params.id);
    if(!element){
        req.flash('error',"Campground cannot found");
        return res.redirect('/campground')
    }
    res.render('update', { element });
}
module.exports.editCampground=async (req, res) => {
// const data=yelpcamp.findById(req.params.id);
    const campground=await yelpcamp.findByIdAndUpdate(req.params.id, {...req.body});
    // console.log(req.files)
    const images=req.files.map(f=> ({url:f.path,filename:f.filename}));
    campground.image.push(...images);
    campground.save();
    // const campground = await yelpcamp.find({});
    req.flash('success','updated campground')
    res.redirect(`/campground/${req.params.id}`);
}