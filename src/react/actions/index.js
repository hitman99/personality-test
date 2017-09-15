import axios from 'axios';

export const fetchQuestions = () => {
    return axios.get('/questions-by-category')
        .then(
            response => response.data
        )
        .catch(
            err => console.log('Fetch failed.', err)
        )
}

export const submitQuestions = ({
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