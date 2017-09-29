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
            error => console.log('Submit failed.', error)
        )
}

export const checkUsername = (username) => {
    
    return axios.get('/username-check', { params: {username} })
    .then(
        response => response.data
    )
    .catch(
        error => console.log('User check failed', error)
    )
}

export const uploadImage = (file) => {
    //let formData = new FormData();
    //formData.append("fileToUpload", );
    return axios.post('/images', file)
            .then(
                response => console.log(response)
            )
            .catch(
                error => console.log(error)
            );
}