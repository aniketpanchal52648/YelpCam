const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.cloud_name, 
//   api_key: process.env.api_key, 
//   api_secret: process.env.api_secret,
// })
cloudinary.config({ 
    cloud_name: 'aniket52648', 
    api_key: '643478963621266', 
    api_secret: 'BBzEhLPXFzMHVKIaZOvNLi8kNsA' 
  });

const storage=new CloudinaryStorage({
    cloudinary,
    folder:'YelpCamp',
    allowedFormats:['jpeg','png','jpg']
})

module.exports={
    cloudinary,
    storage
}