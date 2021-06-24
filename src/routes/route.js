import express from 'express';
import multer from 'multer';
import path from 'path';
import UserModel from '../user/user.model.js';
import Utility from '../../utility/utility.constant.js'
import UserDataLayer from '../user/user.dao.js';
import Auth from '../../utility/auth.js';
import httpStatus from 'http-status-codes'
const router = express.Router();

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000   // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})
//Login
router.post('/auth/login', async (request, response) => {
    try {
        //First Find 
        let userDetails = await UserDataLayer.getUserByEmail(request.body.email)
        if (userDetails) {
            //Compare password with bycyptjs module
            let validPassword = Utility.validatePassword(request.body.password, userDetails.password)
            if (validPassword) {
                //Delete password field from userDetails object
                delete userDetails.password
                //Prepare JWT payload
                let payload = {
                    id: userDetails.id,
                    email: userDetails.email,
                };
                //Prepare tokens object
                userDetails.refreshtoken = UserDataLayer.createRefreshToken(payload)
                //Return the response
                return response.status(httpStatus.OK).send({ status: true, data: userDetails })
            }
            return response.status(httpStatus.FORBIDDEN).send({ status: false, message: "Enter valid password" })
        }
        return response.status(httpStatus.FORBIDDEN).send({ status: false, message: "Enter valid email" })
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message })
    }
})
//Login
router.post('/auth/register', async (request, response) => {
    try {
        //Encrypt the password here..
        request.body.password = await Utility.generateHashPassword(request.body.password);
        //Create User
        let user = await UserDataLayer.getUserByEmail(request.body.email);
        if (user) {
            return response.status(httpStatus.CONFLICT).send({ status: false, message: "Email already exist" })
        }
        //Create User
        let userDetails = await UserModel.create(request.body);
        if (userDetails) {
            return response.status(httpStatus.OK).send({ status: true, message: "User registered successfully" })
        }
        return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: "User not registered" })
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
    }
})

router.get('/api/me', Auth.authentication, async (request, response) => {
    try {
        //First Find 
        let userDetails = await UserDataLayer.getUserByEmail(request.user.email)
        if (userDetails) {
            //Delete password and refreshToken field from userDetails object
            delete userDetails.password;
            return response.status(httpStatus.OK).send({ status: true, data: userDetails })
        }
        return response.status(httpStatus.UNAUTHORIZED).send({ status: false, message: "Unauthorized user" })
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error.message })
    }
})
// For Single image upload
router.post('/api/upload', Auth.authentication, imageUpload.single('image'), (request, response) => {
    try {
        response.status(httpStatus.OK).send({ status: true, data: request.file })
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error })
    }
})

router.get('/public/images/:id', async (request, response) => {
    try {
        
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send({ status: false, message: error })
    }
})
export default router;
