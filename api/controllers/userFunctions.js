let User = require('../db/user');
let quiz = require('./quiz');

module.exports = {
    createQuiz: async (req, res) => {
        try {
            let user = await User.findOne({regno: req.body.regno, quiz: null}).exec();
            if (user == null) {
                throw Error('Error finding user');
            }
            let result = await quiz.generate(user._id);
            if (result.code != 200) {
                throw Error('Quiz not started');
            }
            let updatedUser = await User.findOneAndUpdate({_id:user._id},{quiz: result.quizId}).exec();
            if (updatedUser == null) {
                throw Error('Error adding quiz');
            }
            return res.json({
                quizId: result.quizId,
                numQues: result.numQues,
                code: 200,
                message: 'Successfully started the quiz'
            });
        } catch (err) {
            if (err == 'Error finding user') {
                return res.json({
                    code: 401,
                    message: 'Quiz has already been taken'
                });
            }
            if (err.code == 500) {
                return res.json({
                    code: 500,
                    message: 'Error starting quiz'
                });
            }
            return res.json({
                code: 500,
                message: 'Error starting quiz'
            });
        }
    },
    getQuestion: async (req, res)=> {
        try {
            let user = await User.findOne({regno: req.body.regno}).exec();
            if (user == null) {
                throw Error('Error finding user');
            }
            let question = await quiz.getQuestion(user.quiz, req.query.question_id);
            if (question.code != 200) {
                throw Error('Error getting question');
            }
            return res.json({
                ...question,
                message: 'Successfully found question'
            });
        } catch (err) {
            if (err.code == 500) {
                return res.json({
                    code: 500,
                    message: 'Error getting question'
                });
            }
            return res.json({
                code: 500,
                message: 'Error getting question'
            });
        }
    },
    saveQuestion: async (req, res) => {
        if (req.query.questionType == 'domain') {
            try {
                let user = await User.findOne({regno: req.body.regno}).exec();
                if (user == null) {
                    throw Error('Error finding user');
                }
                req.body.quizId = user.quizId;
                let save = await quiz.saveQuestion(req.user.quiz,req.body.question_id, req.body.answer)
                if (save.code != 200) {
                    throw new Error('Error saving the question');
                }
            } catch (err) {
                if (err.code == 500) {
                    return res.json({
                        code: 500,
                        message: 'Error getting question'
                    });
                }
                return res.json({
                    code: 500,
                    message: 'Error getting question'
                });
            }
            this.addDomainQuestions(req, res);
        } else {
            try {
                let user = await User.findOne({regno: req.body.regno}).exec();
                if (user == null) {
                    throw Error('Error finding user');
                }
                req.body.quizId = user.quizId;
                let save = await quiz.saveQuestion(req.user.quiz,req.body.question_id, req.body.answer)
                if (save.code != 200) {
                    throw new Error('Error saving the question');
                }
                return res.json({
                    code: 200,
                    message: 'Saved answer successfully'
                })
            } catch (err) {
                if (err.code == 500) {
                    return res.json({
                        code: 500,
                        message: 'Error getting question'
                    });
                }
                return res.json({
                    code: 500,
                    message: 'Error getting question'
                });
            }
        }
    },
    addDomainQuestions: async (req, res) => {
        try {
            let added = await quiz.addByDomain(req.body.quizId, req.body.answer);
            if (added.code != 200) {
                throw new Error('Error adding questions');
            }
            return res.json({
                code:200, 
                message: 'Saved answer'
            })
        } catch (err) {
            if (err.code == 500) {
                return res.json({
                    code: 500,
                    message: 'Error getting question'
                });
            }
            return res.json({
                code: 500,
                message: 'Error getting question'
            });
        }    
    },
    submitQuiz: async (req, res) => {
        try {
            let user = await User.findOne({regno: req.body.regno}).exec();
            if (user == null) {
                throw Error('Error finding user');
            }
            let submit = await quiz.submitQuiz(quizId);
            if (submit.code != 200) {
                throw Error('Error submitting quiz');
            }
            return res.json({
                code: 200,
                submitted: true,
                message: 'Quiz has been submitted'
            });
        } catch(err) {
            if (err.code == 500) {
                return res.json({
                    code: 500,
                    message: 'Error submitting quiz'
                });
            }
            return res.json({
                code: 500,
                message: 'Error submitting quiz'
            });
        }
    },
    getDashboard: async (req, res) => {
        try {
            let user = await User.findOne({regno: req.body.regno}).exec();
            if (user == null) {
                throw Error('Error finding user');
            }
            if (user.quiz == null) {
                return res.json({
                    code: 200,
                    success: false,
                    message: 'Quiz not started'
                })
            }
            let result = await quiz.getQuizDashboard(user.quiz);
            if (result.code != 200) {
                throw Error('Error getting dashboard');
            }
            return res.json({
                success: true,
                message: 'Dashboard created',
                ...result
            });
        } catch(err) {
            if (err.code == 500) {
                return res.json({
                    code: 500,
                    message: 'Error getting dashboard'
                });
            }
            return res.json({
                code: 500,
                message: 'Error getting dashboard'
            });
        }
    },
    selected: async (req,res) => {
        try {
            let user = await User.findOne({regno: req.body.regno}).exec();
            if (user == null) {
                throw Error('Error finding user');
            }
            return res.json({
                code: 200,
                message: 'Status found',
                status: user.selected
            });
        } catch(err) {
            if (err.code == 500) {
                return res.json({
                    code: 500,
                    message: 'Error getting status'
                });
            }
            return res.json({
                code: 500,
                message: 'Error getting status'
            });
        }
    }
}