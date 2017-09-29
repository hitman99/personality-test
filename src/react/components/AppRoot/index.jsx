import React from 'react';
import PropTypes from 'prop-types'
import { Header, Container, Step, Divider, Modal, Button, Input, Message } from 'semantic-ui-react';
import Questions from '../QuestionsInCategory'

export default class AppRoot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailProvided: false,
            emailValid: false,
            duplicateEmail: false,
            isCheckingEmail: false
        }
    }

    validateEmail() {
        // check if the username (email) is unique
        let duplicateEmail = false;
        this.props.checkUsername(this.state.email)
            .then(
                response => {
                    if(response.status != 'available'){
                        duplicateEmail = true;
                    }
                    this.setState({ duplicateEmail, isCheckingEmail: false });
                }
            )
            .catch(
                err => this.setState({ duplicateEmail: true, isCheckingEmail: false })
            );
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(this.state.email)){
            this.setState({ emailValid: true });
            if(!this.state.duplicateEmail){
                this.props.onEmailProvided(this.state.email);
            }
        }
        else{
            this.setState({ emailValid: false });
        }
    }

    emailProvided(){
        this.setState({ emailProvided: true });
    }

    pickImage(){
        this.__file.click();
    }

    render(){
        const { steps, questions, onCategoryChange, lastCategory, finished, uploadImage } = this.props;
        const { emailProvided, emailValid, duplicateEmail, isCheckingEmail } = this.state;
        let categoryQuestions, emailModal, emailWarning;
        if(questions.length){
            categoryQuestions = <Questions questions={questions}
                                           onCategoryChange={onCategoryChange}
                                           lastCategory={lastCategory} />
        }
    
        if(duplicateEmail){
            emailWarning = <Message warning
                                    header='Email error'
                                    content='This email has already been used, please enter different email'
                                />
        }

        if(!emailProvided){
            emailModal = <Modal dimmer="blurring" open={true} >
                    <Modal.Header>Please enter valid email address</Modal.Header>
                    <Modal.Content>
                        <Input fluid focus placeholder='Email'
                                onChange={(ev, props)=>{ this.setState({ email: props.value, isCheckingEmail: true }, ()=>{ this.validateEmail() }); }}
                                value={this.state.email} />
                        { emailWarning }
                        <input style={{ 
                                height: '0px',
                                width: '0px',
                                display: 'none'
                            }} 
                            type="file"
                            ref={(input) => { this.__file = input; }}
                            onChange={(ev) => {uploadImage(ev.target.files[0]) }} />
                            <br />
                         <Button color='blue' onClick={this.pickImage.bind(this)}>
                             Upload image
                         </Button>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.emailProvided.bind(this)} disabled={ !emailValid || duplicateEmail || isCheckingEmail } loading={isCheckingEmail}>
                            Continue
                        </Button>
                    </Modal.Actions>
                </Modal>;
        }
        
        if(finished){
            return <Container textAlign="center">
                <Header className="thank-you" as="h1">Thank you!</Header>
            </Container>
        }
        else{
            return (
                <div id="content">
                    <Container textAlign="center">
                        <Header className="the-title" as="h1">Personality Test</Header>
                        <Step.Group size="large" fluid ordered items={steps} stackable="tablet"/>
                        <Divider horizontal>Please answer questions below</Divider>
                        { categoryQuestions }
                    </Container>
                    { emailModal }
                </div>
            );
        }
        
    }
}

AppRoot.PropTypes = {
    steps: PropTypes.array.isRequired,
    sendAnswers: PropTypes.func.isRequired,
    checkUsername: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}