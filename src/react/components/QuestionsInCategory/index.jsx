import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import Question from '../Question'

export default class QuestionsInCategory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: this.prepareAnswers(this.props.questions),
            finished: false
        };
        this.nextCategory = this.nextCategory.bind(this);
    }

    saveAnswer(id, answer){
        let answers = [...this.state.answers];
        answers[id].answer = answer;
        this.setState({ answers });
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

    canMoveToNextCategory(){
        return true
        return this.state.answers.filter( answer => answer.answer == null ).length == 0;
    }

    nextCategory(){
        this.props.onCategoryChange(this.state.answers);
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.questions) != JSON.stringify(this.props.questions)){
            this.setState({ answers: this.prepareAnswers(nextProps.questions) });
        }
    }

    render(){
        const { questions, lastCategory } = this.props;
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