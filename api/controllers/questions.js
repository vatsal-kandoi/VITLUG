let question = require('../db/question');
let logger = require('../../utils/logger');

module.exports = {
    add: (req, res) => {
        let Question = new question({
            domain: req.body.domain,
            question:req.body.question,
            type:req.body.type,
            mcqOptions:req.body.options,
            domainDecider: req.body.domainDecider
        });
        Question.save().then((result) => {
            if (result == null) {
                return res.json({
                    code: 500,
                    message: 'Error adding question'
                });
            }
            logger.log({
                level: 'info',
                message: `Added question ${result._id}`
            });
            return res.json({
                code: 200,
                message: 'Added question'
            });
        }).catch((err) => {
            logger.log({
                level: 'error',
                message: `Error in adding question ${err}`
            });
            return res.json({
                code: 500,
                message: 'Error adding question'
            });
        })
    }
}