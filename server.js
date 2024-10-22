const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('imageInput');  // 'imageInput' is the name of the input field

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Serve the image upload form
app.use(express.static('./'));

// Handle image upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send('Error: ' + err);
        } else {
            res.send('File uploaded successfully!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
