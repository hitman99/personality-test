import axios from 'axios';

export const fetchQuestions = () => {
    return axios.get('/questions-by-category')
        .then(
            response => response.data.questions
        )
        .catch(
            err => console.log('Fetch failed.', err)
        )
}

export const fetchCategories = () => {
    return axios.get('/categories')
        .then(
            response => response.data.categories
        )
        .catch(
            err => console.log('Fetch failed.', err)
        )
}

export const sendAnswers = ({
    username,
    answers
}) => {
    return axios.post('/answers', { username, answers })
        .then(
            response => response.data
        )
        .catch(
            error => console.log('Submit failed.', err)
        )
}