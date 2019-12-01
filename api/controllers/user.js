/** Controlling logging in and out of the site for users */
let user = require('../db/user');
let token = require('../../utils/createToken');
let passwordFunc = require('../../utils/createPassword');

class User {
    constructor(name, email, regno, phone, password) {
        this.name = name;
        this.email = email;
        this.regno = regno;
        this.phone = phone;
        this.password = password;
    }
    validateOnSignup() {
        let name = new RegExp('^[a-zA-Z\h]{1,}$');
        let email = new RegExp('^[a-zA-Z]{1,20}.[A-Za-z]{1,20}20[0-9]{2}@vitstudent.ac.in$');
        let phone = new RegExp('^[1-9]{1}[0-9]{9}$');
        let password = new RegExp('[a-z]{1,}[A-Z]{1,}[0-9]{1,}');
        let regno = new RegExp('^1[1-9]{1}[A-Z]{3}[0-9]{4}');
        
        let error = {
            name: false,
            email: false,
            phone: false,
            password: false,
            regno: false,
            code: 500
        };
        if (name.match(this.name)==null) {
            error.name = true;
        }
        if (email.match(this.email)==null) {
            error.email = true;
        }
        if (phone.match(this.phone)==null) {
            error.phone = true;
        }
        if (password.match(this.password)==null) {
            error.password = true;
        }
        if (regno.match(this.regno)==null) {
            error.regno = true;
        }
        return error;
    }
    validateOnLogin() {
        let password = new RegExp('[a-z]{1,}[A-Z]{1,}[0-9]{1,}');
        let regno = new RegExp('^1[1-9]{1}[A-Z]{3}[0-9]{4}');
        let error = {
            password: false,
            regno: false,
        };

        if (password.match(this.password)==null) {
            error.password = true;
        }
        if (regno.match(this.regno)==null) {
            error.regno = true;
        }
        return error;
    }
    async login() {
        let err = this.validateOnLogin();
        if (!err.regno || !err.password) {
            return err;
        }
        try {
            let res = await user.findOne({regno: this.regno}).exec();
            if (res == null) {
                return {
                    code: 404,
                    message: 'Error finding user'
                }
            }
            let passwordCheck = await passwordFunc.verifyPassword(this.password,res.password);
            if (passwordCheck.code != 200) {
                return {
                    code: 500,
                    message: 'Error checking password'
                }
            } 
            if (!passwordCheck.match) {
                return {
                    code: 400,
                    message: 'Password donot match'
                }
            }
            let jwttoken = await token.generate(this.regno);
            if (jwttoken.code) {
                return {
                    token: jwttoken.token,
                    code: 200
                }
            }
        }
        catch(err) {
            return {
                code: 500,
                message: 'Error finding user'
            };
        }
    }
    async signup() {
        let err = this.validateOnSignup();
        if (!err.name || !err.regno || !err.phone || !err.password || !this.email) {
            return err;
        }
        let passwordCheck = await passwordFunc.createPassword(this.password);
        if (passwordCheck.code != 200) {
            return {
                code: 500,
                message: 'Error creating password'
            }
        }
        this.password = passwordCheck.password;
        let createUser = new user({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            regno: this.regno
        });
        return createUser.save().then((result) => {
            if (result!=null) {
                return token.generate(this.regno);
            }
            throw Error('Error creating user');
        }).then((result) => {
            return {
                token: result.token,
                code: 200,
                regno: this.regno
            }
        }).catch((err) => {
            return {
                code: 500,
                message: 'Error creating user'
            }
        });
    }
}

module.exports = User;