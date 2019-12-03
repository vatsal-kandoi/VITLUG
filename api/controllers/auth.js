/** Controlling authorisation of requests */

let User = require('./user');
let token = require('../../utils/createToken');

module.exports = {
    signup:async (req, res) => {
        let user = new User(req.body.name, req.body.email, req.body.regno, req.body.phone, req.body.password);
        let result = await user.signup();
        if (result.code != 200 && result.message != undefined) {
            return res.json({
                code: 500,
                message: 'Error creating user'
            })
        } else if(result.code != 200 && result.message == undefined) {
            console.log(result)
            return res.json({
                ...result,
                code: 200,
                success: false,
                message: 'Pattern mismatch'
            });
        }
        res.header('X-Auth-Token', result.token);
        res.cookie('VITLUG',result.token,{ expires: new Date(Date.now() + 60*60*1000), httpOnly: true });
        return res.json({
            code: 200,
            success: true,
            regno: req.body.regno,
            name: req.body.name
        });
    },
    login: async (req, res) => {
        try {
            let user = new User(null, null, req.body.regno, null, req.body.password);
            let result = await user.login();
            if (result.code != 200 && result.message != undefined) {
                return res.json({
                    code: 500,
                    message: 'Error creating user'
                })
            } else if(result.code == 500 && result.message == undefined) {
                return res.json({
                    code: 200,
                    success: false,
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
                success: true,
                regno: result.regno,
                name: result.name
            });
        } catch (err) {
            return res.json({
                code: 500,
                message: `Error`
            });
        }
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
    },
    authHome: async (req, res) => {
        let jwttoken = req.cookies['VITLUG'];
        if (jwttoken == undefined) {
            return res.render('index');
        }
        try {
            let result = await token.verify(jwttoken);
            if (result.code !== 200 || result.expired == true) {
                return res.render('index', {
                    message: 'Please login'
                });
            }
            let user = await User.findOne({regno: result.regno}).exec();
            if (user == null) {
                return res.render('index', {
                    message: 'Please login'
                });
            }
            return res.render({
                message: `Logged in as ${user.name}`,
                regno: user.regno
            });
        } catch (err) {
            res.cookie('VITLUG','',{expires: Date.now()})
            return res.render('index', {
                message: 'Please login'
            });
        }
    }
};