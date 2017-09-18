import React from 'react'
import App from '../src/react/containers/AppRootWrapper'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchQuestions, fetchCategories, sendAnswers } from '../src/react/actions'
import { shallow, mount } from 'enzyme';
import QuestionsInCategory from '../src/react/components/QuestionsInCategory'

describe('Backend communications', () => {
    it('fetches questions from correct URL', () => {
        let mock = new MockAdapter(axios);
        const mockHandler = jest.fn(() => [200, {questions:[]}]);
        mock.onGet('/questions-by-category').reply(() => mockHandler());
        expect.assertions(1);
        return fetchQuestions().then(()=>{
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });
    });
    it('fetches categories from correct URL', () => {
        let mock = new MockAdapter(axios);
        const mockHandler = jest.fn(() => [200, {questions:[]}]);
        mock.onGet('/categories').reply(() => mockHandler());
        expect.assertions(1);
        return fetchCategories().then(()=>{
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });
    });
    it('submits answers to correct URL', () => {
        let mock = new MockAdapter(axios);
        const mockHandler = jest.fn(() => [200, { status: 'OK' }]);
        mock.onPost('/answers').reply(() => mockHandler());
        expect.assertions(1);
        return sendAnswers({ username: 'some', answers: [] }).then(()=>{
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });
    });
    it('submits username and answers in POST body', () => {
        let mock = new MockAdapter(axios);
        let data = { username: 'some', answers: [] };
        let postData = null;
        mock.onPost('/answers').reply((config) => {
            postData = JSON.parse(config.data);
            return [200, { status: 'OK' }]
        });
        expect.assertions(1);
        return sendAnswers({ username: 'some', answers: [] }).then(()=>{
            expect(data).toMatchObject(postData);
        });
    });
});

describe('React component rendering', ()=>{
    const mock_data = {
        questions: [
            {
                "question": "Question 1",
                "category": "cat-1",
                "question_type": {
                    "type": "single_choice",
                    "options": [
                        "yes",
                        "sometimes",
                        "no"
                    ]
                }
            },
            {
                "question": "Question 2",
                "category": "cat-1",
                "question_type": {
                    "type": "single_choice_conditional",
                    "options": [
                        "not important",
                        "important",
                        "very important"
                    ],
                    "condition": {
                        "predicate": {
                            "exactEquals": [
                                "${selection}",
                                "very important"
                            ]
                        },
                        "if_positive": {
                            "question": "Bonus question",
                            "category": "cat-1",
                            "question_type": {
                                "type": "number_range",
                                "range": {
                                    "from": 18,
                                    "to": 140
                                }
                            }
                        }
                    }
                }
            },
            {
                "question": "Question 3",
                "category": "cat-2",
                "question_type": {
                    "type": "single_choice",
                    "options": [
                        "yes",
                        "sometimes",
                        "no"
                    ]
                }
            }
        ],
        categories: [
            {
                "name":"cat-1",
                "display":"Category 1"
            },{
                "name":"cat-2",
                "display":"Category 2"
            },
        ]


    }
    it('renders all questions category', ()=>{
        return expect(
            mount(<QuestionsInCategory questions={mock_data.questions}/>).find('.question-visible').length
        ).toBe(mock_data.questions.length)
    });
    it('requests next category when next is clicked', ()=>{
        const mockFn = jest.fn();
        const comp = mount(<QuestionsInCategory questions={mock_data.questions} onCategoryChange={mockFn}/>)
        comp.find('button').simulate('click')
        return expect(mockFn).toHaveBeenCalledTimes(1);
    })
    it('displays bonus question', ()=>{
        const comp = mount(<QuestionsInCategory questions={mock_data.questions} />)
        comp.find('form').childAt(1).find('input:last').simulate('click');
        return expect(comp.find('.question-visible').length).toBe(mock_data.questions.length + 1);
    })
});

/*description('React component integration', ()=>{
    it('Submits results when finish clicked', () => {
        let mock = new MockAdapter(axios);
        let data = { username: 'some', answers: [] };
        let postData = null;
        mock.onPost('/answers').reply((config) => {
            postData = JSON.parse(config.data);
            return [200, { status: 'OK' }]
        });
        expect.assertions(1);
        return sendAnswers({ username: 'some', answers: [] }).then(()=>{
            expect(data).toMatchObject(postData);
        });
    });
})*/