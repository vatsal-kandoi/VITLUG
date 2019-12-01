/** Controlling authorisation of requests */

let User = require('./user');
let token = require('../../utils/createToken');

module.exports = {
    signup:(req, res) => {
        let user = new User(req.body.name, req.body.email, req.body.regno, req.body.phone, req.body.password);
        let result = user.signup();
        if (result.code != 200 && result.message != undefined) {
            return res.json({
                code: 500,
                message: 'Error creating user'
            })
        } else if(result.code != 200 && result.message == undefined) {
            return res.json({
                code: 200,
                message: 'Pattern mismatch',
                ...result
            });
        }
        res.header('X-Auth-Token', result.token);
        res.cookie('VITLUG',result.token,{ expires: new Date(Date.now() + 60*60*1000), httpOnly: true });
        return res.json({
            code: 200,
            regno: req.body.regno
        });
    },
    login: (req, res) => {
        let user = new User(null, null, req.body.regno, null, req.body.password);
        let result = user.login();
        if (result.code != 200 && result.message != undefined) {
            return res.json({
                code: 500,
                message: 'Error creating user'
            })
        } else if(result.code == 500 && result.message == undefined) {
            return res.json({
                code: 200,
                message: 'Pattern mismatch',
                ...result
            });
        } else if(result.code == 404) {
            return res.json({
                code: 404,
                message: `User doesn't exist`
            });
        } else if(result.code == 400) {
            return res.json({
                code: 400,
                message: `Incorrect combination of registration number and password`,
            });
        }
        res.header('X-Auth-Token', result.token);
        res.cookie('VITLUG',result.token,{ expires: new Date(Date.now() + 60*60*1000), httpOnly: true });
        return res.json({
            code: 200,
            regno: req.body.regno
        });
    },
    auth: (req, res, next) => {
        let jwttoken = req.cookies['VITLUG'];
        if (jwttoken == undefined) {
            return res.json({
                code: 500,
                message: 'Please signin'
            });
        }
        token.verify(jwttoken).then((result) => {
            if (result.code !== 200 || result.expired == true) {
                return res.json({
                    code: 500,
                    message: 'Please login to your account'
                });
            }
            req.body.regno = result.regno;
            next();
        }).catch((err) => {
            return res.json({
                code: 500,
                message: 'Please login to your account'
            });
        });
    }
};