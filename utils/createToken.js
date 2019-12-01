let jwt = require('jsonwebtoken');

module.exports = {
    generate: (regno) => {
        return new Promise((resolve, reject) => {
            jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                regno: regno
            }, process.env.JWT,(err, coded) => {
                if (err) {
                    return reject({
                        code: 500,
                        message: 'Error coding token'
                    })
                }
                return resolve({
                    code: 200,
                    token: coded
                })
            });
        })
    },
    verify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT, (err, decoded) => {
                if (err) {
                    return reject({
                        code: 500,
                        message: 'Error decoding token'
                    });
                }
                if (Date.now()/1000 > decoded.exp) {
                    return resolve({
                        code: 200,
                        regno: decoded.regno,
                        expired: true
                    });
                }
                return resolve({
                    code: 200,
                    regno: decoded.regno,
                    expired: false
                });
            });
        });
    }
}