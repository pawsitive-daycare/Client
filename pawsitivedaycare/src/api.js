const axios = require('axios')


export default axios.create({
  baseURL: 'https://pawsitivedaycare-app-85af86a9e0d4.herokuapp.com/',
  timeout: 5000,
  withCredentials: true
})