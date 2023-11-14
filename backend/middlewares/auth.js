
const { Admin, User } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticateUser(request, response, next) {
    const token = getAuthToken(request);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY_USER);
            if (decoded) {
                const user = await User.findOne({ username: decoded.username });
                if (user) {
                    request.user = user;
                    next();
                }
                else {
                    response.status(403).json({ message: "Couldn't find user" });
                }
            }
        }
        catch (e) {
            response.status(403).json({ message: "Error in verifying jwt" })
        }
    }
    else {
        response.status(403).json({ message: "Authorization not added in request header" })
    }
}
async function authenticateAdmin(request, response, next) {
    const token = getAuthToken(request);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
            if (decoded) {
                const admin = await Admin.findOne({ username: decoded.username });
                const allUsers = await Admin.find({});
                if (admin) {
                    request.admin = admin;
                    next();
                }
                else {
                    response.status(403).json({ message: "Couldn't find admin" });
                }
            }
        }
        catch (e) {
            response.status(403).json({ message: "Error in verifying jwt: " + e.message })
        }
    }
    else {
        response.status(403).json({ message: "Authorization not added in request header" })
    }
}

function getAuthToken(req) {
    return req.headers.authorization &&
        req.headers.authorization.split(' ')[1];
}


module.exports =
{
    authenticateAdmin,
    authenticateUser
}