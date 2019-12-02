let quiz = require('../db/quiz');
let question = require('../db/question');

module.exports = {
    generate: (userId) => {
        return new Promise((resolve, reject) => {
            question.find({domain: 'common'}, (err, res) => {
                if (err || res == null) {
                    return reject({
                        error: 500,
                        message: 'Error finding questions'
                    });
                }
                let resp = [];
                for(let i=0; i<res.length; i++) {
                    resp.push({
                        question: res[i]._id,
                        answer: ''
                    });
                }
                let Quiz = new quiz({
                    resp: resp, 
                    user: userId
                });
                Quiz.save().then((res) => {
                    if (res == undefined) {
                        return reject({
                            code: 500,
                            message: 'Error creating quiz'
                        });
                    }
                    return resolve({
                        code: 200,
                        message: 'Created quiz',
                        quizId: res._id,
                    })
                }).catch((err) => {
                    return reject({
                        code: 500,
                        message: 'Error creating questions'
                    });
                });
            });
        });
    },
    addByDomain: (quizId, domains, questionId) => {
        return new Promise((resolve, reject) => {
            question.find({domain: { $in: domains }}, (err, res) => {
                if (err || res == null) {
                    return reject({
                        error: 500,
                        message: 'Error finding questions'
                    });
                }
                let resp = [];
                for(let i=0; i<res.length; i++) {
                    resp.push({
                        question: res[i]._id,
                        answer: ''
                    });
                }
                quiz.findOne({$and:[{_id: quizId},{'resp.$.answer':''},{'resp.$.question':questionId}]}, (err, res) => {
                    if (err || res == null) {
                        return reject({
                            error: 401,
                            message: 'Domains already selected'
                        });
                    }
                    let questions = res.resp;
                    questions.push(...resp);
                    quiz.findOneAndUpdate({_id: quizId},{resp: questions}, (err, res) => {
                        if (err || res == undefined) {
                            return reject({
                                code: 500,
                                message: 'Error creating quiz'
                            });
                        }
                        return resolve({
                            code: 200,
                            message: 'Added quiz questions',
                        });
                    })                    
                });
            });
        });
    },
    getQuestion: (quizId, questionId) => {
        return new Promise((resolve, reject) => {
            quiz.findOne({_id: quizId, submitted: false}).populate('resp.question').exec((err, result) => {
                if (err || result == null) {
                    return reject({
                        code: 500, 
                        message: 'Error finding questions'
                    });
                }
                let question = result.resp.filter((val) => {
                    if ( val.question._id == questionId) {
                        return val;
                    }
                });
                return resolve({
                    code: 200,
                    question: question[0].question,
                    answer: question[0].answer
                });
            });
        });
    },
    saveQuestion: (quizId, questionId, answer) => {
        return new Promise((resolve, reject) => {
            quiz.findOneAndUpdate({_id: quizId, submitted: false,'resp.question':questionId}, {'resp.$.answer': answer}, (err, result) => {
                if (err || result == null) {
                    return reject({
                        code: 500, 
                        message: 'Error saving questions'
                    });
                }
                return resolve({
                    code: 200,
                    message: 'Saved answer'
                });
            });
        });
    },
    getQuizDashboard: (quizId) => {
        return new Promise((resolve, reject) => {
            quiz.findOne({_id: quizId, submitted: false}, (err, result) => {
                if (err || result == null) {
                    return reject({
                        code: 500,
                        message: 'Error finding quiz'
                    });
                }
                let dashboard = result.resp.map((val) => {
                    let retObj = {};
                    if (val.answer == "") {
                        retObj.answered = false;
                    } else {
                        retObj.answered = true;
                    }
                    retObj.question_id = val.question;
                    return retObj;
                });
                return resolve({
                    code: 200,
                    message: 'Successfully generated dashboard',
                    dashboard,
                })
            });
        });
    },
    submitQuiz: (quizId) => {
        return new Promise((resolve, reject) => {
            quiz.findOneAndUpdate({_id: quizId},{submitted: true}, (err, result) => {
                if (err || result == null) {
                    return reject({
                        code: 500,
                        message: 'Error submitting quiz'
                    });  
                }
                return resolve({
                    code: 200, 
                    message: 'Quiz submitted'
                });
            });
        });
    }
}