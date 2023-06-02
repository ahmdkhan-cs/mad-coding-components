const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const employeeRoutes = require('./routes/employees');

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());


// FILE STORAGE
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

// ROUTES WITH FILE
app.post('/file', upload.single('file'), (req, res, next) => {
    if(!req.file){
        res.status(400).send('No file selected.');
        return;
    }

    res.send('File uploaded!');
});


// ROUTES
app.use('/employees', employeeRoutes);

const PORT = process.env.PORT || 6000;

// MONGO DB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(`${error}, connection failure`);
});