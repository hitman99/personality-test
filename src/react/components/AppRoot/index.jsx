import React from 'react';
import PropTypes from 'prop-types'
import { Header, Container, Step, Divider, Modal, Button, Input } from 'semantic-ui-react';
import Questions from '../QuestionsInCategory'

export default class AppRoot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailProvided: false,
            emailValid: false
        }
    }

    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(this.state.email)){
            this.setState({ emailValid: true });
        }
        else{
            this.setState({ emailValid: false });
        }
    }

    emailProvided(){
        this.props.onEmailProvided(this.state.email);
        this.setState({ emailProvided: true });
    }

    render(){
        const { steps, questions, onCategoryChange, lastCategory, finished } = this.props;
        const { emailProvided, emailValid } = this.state;
        let categoryQuestions;
        if(questions.length){
            categoryQuestions = <Questions questions={questions}
                                           onCategoryChange={onCategoryChange}
                                           lastCategory={lastCategory} />
        }
        if(finished){
            if(!emailProvided){
                return <Container>
                    <Modal dimmer="blurring" open={true} >
                        <Modal.Header>Please enter valid email address</Modal.Header>
                        <Modal.Content>
                            <Input fluid focus placeholder='Email'
                                   onChange={(ev, props)=>{ this.setState({ email: props.value }, ()=>{ this.validateEmail() }); }}
                                   value={this.state.email} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={()=>{ this.emailProvided() }} disabled={!emailValid}>
                                Finish
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Container>
            }
            else{
                return <Container textAlign="center">
                    <Header className="thank-you" as="h1">Thank you!</Header>
                </Container>
            }
        }
        else {
            return (
                <div id="content">
                    <Container textAlign="center">
                        <Header className="the-title" as="h1">Personality Test</Header>
                        <Step.Group size="large" fluid ordered items={steps} stackable="tablet"/>
                        <Divider horizontal>Please answer questions below</Divider>
                        { categoryQuestions }
                    </Container>
                </div>
            );
        }
    }
}

AppRoot.PropTypes = {
    steps: PropTypes.array.isRequired,
    sendAnswers: PropTypes.func.isRequired
}