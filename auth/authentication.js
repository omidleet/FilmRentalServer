/**
 * Created by jordanh2os on 15/06/2017.
 */

var settings = require('../config.json');
const moment = require('moment');
const jwt = require('jwt-simple');

// encode (username naar token)
function encodeToken(username) {
    const payload = {
        exp: moment().add(2, 'days').unix,
        iat: moment().unix,
        sub: username
    };
    return jwt.encode(payload, settings.secretkey);
}

// decode (token naar username)
function decodeToken(token, cb) {
    try{
        const payload = jwt.decode(token, settings.secretkey);

        // check if token has expired
        const now = moment().unix();

        if (now > payload.exp){
            console.log('Token has expired.');
        }

        // Return
        cb(null, payload);

    } catch (err){
        cb(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
}