/**
 * Created by Tomas on 2017-09-14.
 */

var questionsByCategory = [];

function splitQuestionsByCategory(categories, questions){
    var categorizedQuestions = categories.reduce(function(accum, category){
        accum[category.name] = [];
        return accum;
    }, {});

    questions.reduce(function(accum, question){
        categorizedQuestions[question.category].push(question);
        return categorizedQuestions;
    }, categorizedQuestions);

    return categorizedQuestions;
}

function getQuestionsByCategory(){
    return questionsByCategory;
}


module.exports = function(questions){
    questionsByCategory = splitQuestionsByCategory(questions.categories, questions.questions);
    return {
        questions: getQuestionsByCategory(),
        categories: questions.categories
    };
};

