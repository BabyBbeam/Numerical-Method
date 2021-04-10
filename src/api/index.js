const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/BabyBbeam/Numerical-Method/"
})

const getAllRoe = () => api.get('/root_of_eqution')

const apis = {
    getAllRoe
}

export default apis