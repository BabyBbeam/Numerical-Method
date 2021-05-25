const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/BabyBbeam/Numerical-Method/"
})

const getMultiLinear = () => api.get ('/multilinearregression')

const apis = {
    getMultiLinear
}

export default apis 