import React from 'react'
import PropTypes from 'prop-types'
import { Header, Segment, Responsive } from 'semantic-ui-react'
import SingleChoice from '../QuestionTypes/SingleChoice'
import NumberRange from '../QuestionTypes/NumberRange'

export default class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answered: false
        };
    }

    onChange(value){
        this.setState({ answered: true });
        this.props.onChange(value);
    }

    render(){
         let content, additionalContent;
         const { question, type, visible, markRed } = this.props;
         const { answered } = this.state;
         
         switch(type.type){
             case 'single_choice':
             case 'single_choice_conditional':
                 content = <SingleChoice options={type.options} onChange={this.onChange.bind(this)} />
                 break;
             case 'number_range':
                 content = <NumberRange range={type.range} onChange={this.onChange.bind(this)} />
                 break;
             default:
                 break;
         }

         return(
                <div className={"question" + (visible ? '-visible' : '-invisible')} style={{ display: (visible ? 'block' : 'none') }}>
                    <Header as='h4' attached='top' textAlign={'left'}>
                        { question }
                    </Header>
                    <Responsive as={Segment} attached='bottom' textAlign={'left'} color={ (markRed && !answered ? 'red' : null) } >
                        { content }
                    </Responsive>
                    <br />
                </div>
         );
    }
}

Question.PropTypes = {
    markRed: PropTypes.bool
}


