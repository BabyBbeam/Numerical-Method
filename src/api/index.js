const axios = require('axios')

//ดึงโจทย์จาก db.json ของเราที่อยู่ใน github 
const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/BabyBbeam/Numerical-Method/"
})

const getAllRoe = () => api.get('/root-of-equation')
const getAllMatrix = () => api.get('/matrix')
const getAllInterpolation = () => api.get('/interpolation')
const getAllRegression = () => api.get('/regression')

const apis = {
    getAllRoe,
    getAllMatrix,
    getAllInterpolation,
    getAllRegression
}

export default apis