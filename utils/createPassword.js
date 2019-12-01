let bcrypt = require('bcrypt');

saltRounds = 10;

module.exports = {
    createPassword: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    return resolve({
                        code: 500,
                        message: 'Error creating hash'
                    });
                }
                return resolve({
                    code: 200,
                    password: hash
                });
            });
        })
    },
    verifyPassword: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, res) {
                if (err) {
                    return resolve({
                        code: 500,
                        message: 'Error verifying hash'
                    });
                }
                return resolve({
                    code: 200,
                    match: res
                });
            });
        });
    }
};
