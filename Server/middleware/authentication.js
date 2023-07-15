const jwt = require('jsonwebtoken');
let AUTH = require('../model/users');

exports.Authentication = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error('token not found');
        }
        const checkToken = await jwt.verify(token, "auth_session_id");
        let loginUserData = await AUTH.findById(checkToken.id);
        if (!loginUserData) {
            throw new Error('user not found');
        }
        req.user = loginUserData
        next();
    } catch (error) {
        res.status(404).json({
            status: 400,
            message: error.message,
        });
    }
};
