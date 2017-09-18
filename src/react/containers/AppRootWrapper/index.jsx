import React from 'react'
import { fetchQuestions, fetchCategories, sendAnswers } from '../../actions'
import AppRoot from '../../components/AppRoot'
export default class AppRootWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions: {},
            steps: [],
            isFetching: true,
            isSending: false,
            error: false,
            answers: [],
            activeCategory: -1,
            categories: [],
            finished: false,
            email: null
        };

        this.onCategoryChange = this.onCategoryChange.bind(this);
        fetchCategories()
            .then(
                categories => this.setState({
                        activeCategory: 0,
                        categories,
                        steps: this.generateSteps(categories, 0)
                    })
            )
            .catch(
                error => this.setState({ error: true })
            )

        fetchQuestions()
            .then(
                questions => this.setState({ questions })
            )
            .catch(
                error => this.setState({ error: true })
            )
    }

    generateSteps(categories, activeCategory){
        return categories.map( (category, id) => {
            return {
                completed: false,
                title: category.display,
                name: category.name,
                active: activeCategory == id
            }
        });
    }

    onCategoryChange(categoryAnswers){
        let answers = [...this.state.answers];
        const { categories, email } = this.state;
        answers = answers.concat(categoryAnswers);
        let activeCategory = this.state.activeCategory;
        if(activeCategory + 1 == this.state.categories.length){
            // that's it
            this.setState({ finished: true });
            if(email){
                sendAnswers({ username: email, answers});
            }
        }
        else{
            activeCategory++;
            this.setState({
                answers,
                activeCategory,
                steps: this.generateSteps(categories, activeCategory)
            });
        }

    }

    render(){
        let categoryQuestions = [];
        const { categories, questions, activeCategory, finished } = this.state;
        if(activeCategory >= 0 && Object.keys(questions).length){
            categoryQuestions = questions[categories[activeCategory].name];
        }
        return <AppRoot steps={this.state.steps}
                        questions={categoryQuestions}
                        onCategoryChange={this.onCategoryChange}
                        lastCategory={activeCategory + 1 == categories.length}
                        finished={finished}
                        onEmailProvided={(email)=>{ this.setState({ email })}} />
    }
}