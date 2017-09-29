import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'

export default class UnansweredQuestionsModal extends React.Component{

    render(){
        return(
            <Modal dimmer="blurring" open={true} >
                <Modal.Header>Unanswered questions</Modal.Header>
                <Modal.Content>
                    You left unanswered questions (marked in red). Please answer questions in order to continue
                </Modal.Content>
                <Modal.Actions>
                    <Button color='grey' onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

UnansweredQuestionsModal.PropTypes = {
    onClose: PropTypes.func.isRequired
}