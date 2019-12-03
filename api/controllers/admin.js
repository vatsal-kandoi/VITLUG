let question = require('../db/question');
let quiz = require('../db/quiz');
let user = require('../db/user');

module.exports = {
    getQuiz: async (req, res) => {
        try {
            if (req.query.quizId == undefined) {
                let quizzes = await quiz.find({grade:0}).select('user submitted _id').populate({path: 'user', select:'_id name regno'}).exec();
                if (quizzes == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Found quizzes',
                    responses: quizzes
                })
            } else {
                let quizzes = await quiz.findOne({_id: req.query.quizId })
                    .populate({path: 'user', select:'_id name regno'})
                    .populate('resp.question')
                    .exec();
                    console.log(quizzes);
                if (quizzes == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Found quiz',
                    success: true,
                    response: quizzes
                })
            }
        } catch(err) {
            console.log(err);
            return res.json({
                code: 500,
                message: 'Error getting quizzes'
            })
        }
    },
    gradeQuiz: async (req, res) => {
        try {
            if (req.query.quizId == undefined) {
                return res.json({
                    code: 400,
                    message: 'Enter quiz id'                
                })
            } else {
                let quizzes = await quiz.findOneAndUpdate({_id: req.query.quizId },{grade: req.body.grade}).exec();
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
                let User = await user.findOneAndUpdate({_id: req.query.user_id },{selected: req.body.selected}).exec();
                if (User == null) {
                    throw new Error('Error getting quizzes');
                }
                return res.json({
                    code: 200,
                    message: 'Updated user'
                });
            }
        } catch(err) {
            console.log(err);
            return res.json({
                code: 500,
                message: 'Error updating selection status'
            })
        }
    }
};