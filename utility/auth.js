import httpStatus from 'http-status-codes'
import UserDataLayer from '../src/user/user.dao.js';
export default class Auth {
    static async authentication(request, response, next) {
        //Check refresh and token values in request headers
        if (request.headers.refreshtoken !== undefined) {
            let authenticate = await UserDataLayer.authenticate(request.headers.refreshtoken);
            if (authenticate.auth) {
                //set headers.
                response.setHeader("refreshtoken", authenticate.tokensObject.refreshtoken);
                request.user = authenticate.user;
                //Send to next middlewear
                next();
            } else {
                response.status(httpStatus.UNAUTHORIZED).send({ status: false, message: 'Unauthorized User' });
            }
        } else {
            response.status(httpStatus.UNAUTHORIZED).send({ status: false, message: 'Provide Token and RefreshToken In Request Headers.' });
        }
    }
}