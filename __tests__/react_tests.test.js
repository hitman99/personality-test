import App from '../src/react/containers/AppRootWrapper'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchQuestions, fetchCategories, sendAnswers } from '../src/react/actions'

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