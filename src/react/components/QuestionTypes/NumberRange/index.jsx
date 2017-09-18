import React from 'react';
import { Form, Segment } from 'semantic-ui-react'
import Slider from 'react-rangeslider'


export default class NumberRange extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: props.range.from
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value){
        this.setState({ value }, ()=>{
            this.props.onChange(value);
        });
    }

    render(){
        const { range } = this.props;

        return(
            <Form>
                <Slider
                    value={this.state.value}
                    min={range.from}
                    max={range.to}
                    onChange={this.handleChange}
                />
                <Segment basic textAlign={'center'}>
                    <b>{this.state.value}</b>
                </Segment>
            </Form>
        );
    }
}