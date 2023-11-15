const jwt = require('jsonwebtoken')
require('dotenv').config();
const {ADMIN_ROLE, USER_ROLE} = require('../constants/userRoles.js')
function generateJWT(username, role) {
    const token = jwt.sign({ username }, role === USER_ROLE ? process.env.SECRET_KEY_USER : process.env.SECRET_KEY_ADMIN, { expiresIn: '1h' });
    return token;
  }

  module.exports = {
    generateJWT
  }