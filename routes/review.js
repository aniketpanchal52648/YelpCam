const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../schema');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const yelpcamp = require('../models/campground');
const reviewS = require('../models/review');
const {isLoggedIn}=require('../middleware');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', isLoggedIn,validateReview, catchAsync(async (req, res, next) => {
    const campground_el = await yelpcamp.findById(req.params.id);
    const review_new = new reviewS(req.body);
    campground_el.review.push(review_new);
    await campground_el.save();
    await review_new.save();
    req.flash('success',"added new review")
    res.redirect(`/campground/${campground_el._id}`);

}))

router.delete('/:reviewid', isLoggedIn,catchAsync(async (req, res, next) => {
    const { id, reviewid } = req.params;
    await yelpcamp.findByIdAndUpdate(id, { $pull: { review: reviewid } });
    await reviewS.findByIdAndDelete(reviewid);
    req.flash('success',"deleted review")
    res.redirect(`/campground/${id}`);
}))
module.exports.reviewroute = router;