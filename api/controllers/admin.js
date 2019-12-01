let question = require('../db/question');
let quiz = require('../db/quiz');
let user = require('../db/user');

module.exports = {
    getQuiz: async (req, res) => {
        try {
            if (req.query.quiz_id == undefined) {
                let quizzes = await quiz.find({grade:0}).select('user _id').populate({path: 'user', select:'_id name regno'}).exec();
                if (quizzes == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Found quizzes',
                    responses: quizzes
                })
            } else {
                let quizzes = await quiz.findOne({_id: req.query.quiz_id }).select('user resp _id').populate({path: 'user', select:'_id name regno'},{path:'resp.question',select:'question _id mcqOptions type domain domainDecider'}).exec();
                if (quizzes == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Found quizzes',
                    response: quizzes
                })
            }
        } catch(err) {
            return res.json({
                code: 500,
                message: 'Error getting quizzes'
            })
        }
    },
    gradeQuiz: async (req, res) => {
        try {
            if (req.query.quiz_id == undefined) {
                return res.json({
                    code: 400,
                    message: 'Enter quiz id'                
                })
            } else {
                let quizzes = await quiz.findOneAndUpdate({_id: req.query.quiz_id },{grade: req.bod.grade}).exec();
                if (quizzes == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Graded quiz'
                });
            }
        } catch(err) {
            return res.json({
                code: 500,
                message: 'Error grading quiz'
            })
        }
    },
    selectUser: async (req, res) => {
        try {
            if (req.query.user_id == undefined) {
                return res.json({
                    code: 400,
                    message: 'Enter user id'                
                })
            } else {
                let User = await user.findOneAndUpdate({_id: req.query.user_id },{selected: req.bod.selected}).exec();
                if (User == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Updated user'
                });
            }
        } catch(err) {
            return res.json({
                code: 500,
                message: 'Error updating selection status'
            })
        }
    }
};