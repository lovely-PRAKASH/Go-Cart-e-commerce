const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads/products directory exists
const uploadPath = path.join(__dirname, 'uploads', 'products');
console.log('Destination Path:', uploadPath);
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log('Uploads directory created:', uploadPath);

}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); // Save files to the local 'uploads/products' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        

    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB file size limit
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpg|jpeg|png/;
        const isMimeTypeValid = fileTypes.test(file.mimetype);
        const isExtNameValid = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (isMimeTypeValid && isExtNameValid) {
            return cb(null, true);
        }
        cb(new Error("Only images (jpg, jpeg, png) are allowed"));
    }
});

module.exports = upload;
