import React from 'react';
import PropTypes from 'prop-types'
import { Header, Container, Step, Divider, Modal, Button } from 'semantic-ui-react';
import Questions from '../QuestionsInCategory'

export default class AppRoot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailProvided: false
        }
    }

    emailProvided(){
        this.props.onEmailProvided(this.state.email);
        this.setState({ emailEntered: true });
    }

    render(){
        const { steps, questions, onCategoryChange, lastCategory, finished } = this.props;
        const { emailEntered } = this.state;
        let categoryQuestions;
        if(questions.length){
            categoryQuestions = <Questions questions={questions}
                                           onCategoryChange={onCategoryChange}
                                           lastCategory={lastCategory} />
        }
        if(finished){
            if(!emailEntered){
                return <Container>
                    <Modal dimmer="blurring" open={true} >
                        <Modal.Header>Please provide your email address</Modal.Header>
                        <Modal.Content>
                            <Input fluid focus placeholder='Email'
                                   onChange={(ev, props)=>{ this.setState({ email: props.value }); }}
                                   value={this.state.email} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={()=>{ this.emailProvided() }}>
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