import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import Question from '../Question'

export default class QuestionsInCategory extends React.Component {
    constructor(props){
        super(props);
        let questions = this.processQuestions(this.props.questions);
        this.state = {
            answers: this.prepareAnswers(questions),
            questions,
            finished: false
        };
        this.nextCategory = this.nextCategory.bind(this);
    }

    saveAnswer(id, answer){
        let answers = [...this.state.answers];
        let questions = [...this.state.questions];
        answers[id].answer = answer;
        if(questions[id].hasBonus){
            if(this.processCondition(questions[id].question_type.condition, answer)){
                questions[id+1].visible = true;
            }
            else{
                questions[id+1].visible = false;
            }
        }
        this.setState({ answers, questions });
    }

    prepareAnswers(questions){
        return questions.map( (question) => {
            return {
                question: question.question,
                answer: null,
                category: question.category
            };
        } );
    }

    /**
     * Prepares questions for displaying
     * @param questions
     */
    processQuestions(questions){
        let allQuestions = [];
        questions.forEach( (question, key) => {
            if(question.question_type.type == 'single_choice_conditional'){
                allQuestions.push(Object.assign({}, question, { visible: true, hasBonus: true }));
                if(question.question_type.condition && question.question_type.condition.if_positive){
                    allQuestions.push(Object.assign({}, question.question_type.condition.if_positive,
                        { visible: false, hasBonus: false }))
                }
            }
            else{
                allQuestions.push(Object.assign({}, question, { visible: true, hasBonus: false }));
            }
        });
        return allQuestions;
    }

    processCondition(condition, targetValue){
        let matches = false;
        if(condition.predicate.exactEquals){
            if(targetValue == condition.predicate.exactEquals[1]){
                matches = true;
            }
        }
        return matches;
    }

    canMoveToNextCategory(){
        return true
        return this.state.answers.filter( answer => answer.answer == null ).length == 0;
    }

    nextCategory(){
        const { answers, questions } = this.state;
        let filteredAnswers = answers.filter( (answer, key) => questions[key].visible);
        this.props.onCategoryChange(filteredAnswers);
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.questions) != JSON.stringify(this.props.questions)){
            let questions = this.processQuestions(nextProps.questions);
            this.setState({ answers: this.prepareAnswers(questions), questions });
        }
    }

    render(){
        const { lastCategory } = this.props;
        const { questions } = this.state;
        let button;
        if(!lastCategory){
            button = <Button primary
                             content='Next'
                             icon='right arrow'
                             labelPosition='right'
                             floated='right'
                             disabled={!this.canMoveToNextCategory()}
                             onClick={this.nextCategory} />
        }
        else{
            button = <Button color={'green'}
                        content='Finish'
                        icon='check'
                        labelPosition='right'
                        floated='right'
                        onClick={this.nextCategory} />
        }
        return (
            <div>
                {
                    questions.map( (question, key) => <Question question={question.question}
                                                                type={question.question_type}
                                                                visible={question.visible}
                                                                key={question.category + key}
                                                                onChange={this.saveAnswer.bind(this, key)}/> )
                }
                { button }
            </div>
        );
    }
}

QuestionsInCategory.PropTypes = {
    questions: PropTypes.array.isRequired
}