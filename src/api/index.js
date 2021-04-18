const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/BabyBbeam/Numerical-Method/"
})

const getAllRoe = () => api.get('/root-of-equation')
const getAllMatrix = () => api.get('/matrix')

const apis = {
    getAllRoe,
    getAllMatrix
}

export default apis