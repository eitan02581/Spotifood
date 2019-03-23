
const multer = require("multer");
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name: 'sprint4-weat',
    api_key: '374847576281927',
    api_secret: 'mhrO1H8NeR_nFZ_1ZC3QPpVU-TU'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage })

const RecipeService = require('../services/recipe-service')





function addUploadRoutes(app) {
    app.post('/uploadImg', parser.single('image'), (req, res) => {
        console.log('req.file',req.file)
        const image = {};
        image.url = req.file.url;
        image.id = req.file.public_id;
        res.json(image.url)
    })

}

module.exports = addUploadRoutes