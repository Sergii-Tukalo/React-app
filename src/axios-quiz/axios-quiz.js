import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-61b31.firebaseio.com/'
})