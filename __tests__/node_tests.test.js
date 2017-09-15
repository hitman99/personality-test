/**
 * Created by Tomas on 2017-09-09.
 */
import request from 'supertest'

import app from '../src/express/routes';
import qDB from '../src/questionsDB';
import answers from '../src/answersStorage';
import ioredis from 'ioredis';

const mock_questions = {
    categories:[
        {
            name: "cat-1",
            description: "cat-1"
        }
    ],
    questions:[
        {
            category: "cat-1"
        },
        {
            category: "cat-1"
        }
    ]
};

describe('Questions DB module', () => {
    let questions = qDB(mock_questions);
    it('flattens categories by name', () => {
        return expect(questions).toHaveProperty('cat-1');
    });
    it('puts questions into categories correctly', () => {
        return expect(questions['cat-1']).toHaveLength(2);
    });
});


describe('Answer storage', () =>{
    jest.mock('ioredis');
    const mockFn = jest.fn();
    it('does not allow duplicate usernames', () => {
        expect.assertions(1);
        return expect(answers.saveAnswers({ username: 'duplicate_name', answers: {}, timestamp: new Date().getTime() })).rejects.toEqual('User already exists');
    });
    it('saves answers for user', () => {
        expect.assertions(1);
        return expect(answers.saveAnswers({ username: 'test_name', answers: {}, timestamp: new Date().getTime() })).resolves.toEqual('OK');
    });

});


describe('API Tests', () => {
    let questions = qDB(mock_questions);

    it('provides questions', () => {
        return request(app(questions)).get('/questions-by-category')
            .expect(200)
            .then((response)=>{
                expect(response.body).toHaveProperty('questions');
            })
    });
    it('provides questions by category', () => {
        return request(app(questions)).get('/questions-by-category')
            .expect(200)
            .then((response)=>{
                expect(response.body.questions).toHaveProperty('cat-1');
                expect(response.body.questions['cat-1']).toHaveLength(2);
            })
    });

});

