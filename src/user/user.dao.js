import UserModel from './user.model.js'
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize';
import Utility from '../../utility/utility.constant.js';
//Extra Data access layer for User model
//It contains DAO(i.e Data Access Object) logics
export default class UserDataLayer {
    //Return the all users from User table
    static async getAllUsers(options) {
        let whereCondition = [];
        //Order
        let order = await Utility.order(options);
        //Pagination
        let page = await Utility.pagination(options);
        //
        return await UserModel.findAll({
            where: {
                [Sequelize.Op.and]: whereCondition,
            },
            include: [
                { all: true, nested: false }
            ],
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            order: order,
            offset: page.offset,
            limit: page.limit,
        })
    }
    //Return particular user details by id
    static async getUserByID(id) {
        return await UserModel.findByPk(id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
    }
    //Return particular user details by email
    static async getUserByEmail(email) {
        return await UserModel.findOne({
            where: { email: email },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true //Means it will give raw results from sequelize. We don't have to use results.dataValues / parse the JSON in controler.
        }
        )
    }
    //Return particular user details by token
    static async getUserByToken(refreshToken) {
        return await UserModel.findOne({
            where: { refreshToken: refreshToken },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true //Means it will give raw results from sequelize. We don't have to use results.dataValues / parse the JSON in controler.
        }
        )
    }

    //Create a refresh token
    static createRefreshToken(payload) {
        try {
            if (process.env.JWT_REFRESH_SECRET == null) {
                throw new Error("Provide JWT_REFRESH_SECRET value in .env.");
            }
            else {
                return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
                    expiresIn: process.env.EXPIRY_TIME || '5m'
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    //Verify User Token 
    static authenticate(refreshtoken) {
        return new Promise(async (resolve, reject) => {
            try {
                //here check header token. if valid allow to access other services.
                let decodedToken = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);
                //Save tokens object
                let tokens = {};
                if (decodedToken) {
                    //Existing token
                    tokens.refreshtoken = refreshtoken;
                    return resolve({ auth: true, tokensObject: tokens, user: { id: decodedToken.id, email: decodedToken.email } });
                }
                else {
                    return resolve({ auth: false });
                }
            } catch (error) {
                return resolve({ auth: false });
            }
        })
    }
}