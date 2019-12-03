let token = require('../../utils/createToken');

module.exports = {
    general: async (req, res, next) => {
        let jwttoken = req.cookies['VITLUG'];
        if (jwttoken == undefined) {
            return res.render('admin/admin',{
                message: 'Please signin'
            });
        }    
        try {
            let result = await token.verify(jwttoken);
            if (result.code !== 200 || result.expired == true || result.regno !== 'admin') {
                return res.render('admin/admin',{
                    message: 'Please login to your account'
                });
            }
            next();
        } catch (err) {
            return res.render('admin/admin',{
                message: 'Please signin'
            });
        }
    },
    home: async (req, res) => {
        let jwttoken = req.cookies['VITLUG'];
        if (jwttoken == undefined) {
            return res.render('admin/admin');
        }    
        try {
            let result = await token.verify(jwttoken);
            if (result.code !== 200 || result.expired == true || result.regno !== 'admin') {
                return res.render('admin/admin',{
                    message: 'Please login to your account'
                });
            }
            return res.redirect('/admin/dashboard');
        } catch (err) {
            return res.render('admin/admin',{
                message: 'Please signin'
            });
        }
    }
};