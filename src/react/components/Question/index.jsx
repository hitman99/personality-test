import React from 'react';
import { Header, Segment, Responsive } from 'semantic-ui-react'
import SingleChoice from '../QuestionTypes/SingleChoice'
import NumberRange from '../QuestionTypes/NumberRange'

export default class Question extends React.Component {

    render(){
         let content, additionalContent;
         const { question, type, onChange, visible } = this.props;
         switch(type.type){
             case 'single_choice':
             case 'single_choice_conditional':
                 content = <SingleChoice options={type.options} onChange={onChange} />
                 break;
             case 'number_range':
                 content = <NumberRange range={type.range} onChange={onChange} />
                 break;
             default:
                 break;
         }

         return(
                <div className={"question" + (visible ? '-visible' : '-invisible')} style={{ display: (visible ? 'block' : 'none') }}>
                    <Header as='h4' attached='top' textAlign={'left'}>
                        { question }
                    </Header>
                    <Responsive as={Segment} attached='bottom' textAlign={'left'}>
                        { content }
                    </Responsive>
                    <br />
                </div>
         );
    }
}




