import React from 'react';
import { Form, Radio } from 'semantic-ui-react'

export default class SingleChoiceConditional extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: -1
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev, {value}){
        this.setState({ selected: value }, ()=>{
            this.props.onChange(this.props.options[value]);
        });
    }

    render(){
        const { options, condition } = this.props;
        return(
            <Form>
                {
                    options.map( (option, id) => [
                        <Form.Field>
                            <Radio
                                label={ option }
                                name='radioGroup'
                                value={id}
                                checked={this.state.selected === id}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    ])
                }
            </Form>
        );
    }
}