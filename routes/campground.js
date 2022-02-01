const express = require('express');
const { campgroundSchema } = require('../schema');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const yelpcamp = require('../models/campground');
const router=express.Router();
const passport=require('passport');
const {isLoggedIn}=require('../middleware');
const flash=require('connect-flash');
const multer=require('multer');
const {storage}=require('../cloudinary/index');
const upload=multer({ storage });
// const upload = multer({ dest: 'uploads/' })
const campground=require('../controllers/campground');

const validateSchema = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }

}
router.get('/', catchAsync(campground.renderCampground));

router.get('/new', isLoggedIn,campground.renderNewCampground);

router.post('/',isLoggedIn,upload.array('image') ,validateSchema, catchAsync(campground.makeNewCampground));
// router.post('/',upload.array('image'),(req,res)=>{
// console.log(req.body,req.files);
// res.send('IT WORKED');
// })
router.delete('/:id', isLoggedIn,catchAsync(campground.deleteCampground))
router.get('/:id', catchAsync(campground.getCampground));

router.get('/:id/edit', isLoggedIn,catchAsync(campground.renderEditCampground));
router.put('/:id', isLoggedIn,upload.array('image'),validateSchema, catchAsync(campground.editCampground));

module.exports.campgroundroute=router