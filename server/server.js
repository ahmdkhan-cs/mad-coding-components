const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const validTypes = ['png', 'jpg', 'jpeg', 'gif'];
        if(!validTypes.includes(file.mimetype.split('/')[1])){
            return cb(`File is not valid. Only ${validTypes.join(', ')} are allowed.`, false);
        }
        return cb(null, true);
    }
});

app.post('/file', upload.single('file'), (req, res, next) => {
    if(!req.file){
        res.status(400).send('No file selected.');
        return;
    }

    res.send('File uploaded!');
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})