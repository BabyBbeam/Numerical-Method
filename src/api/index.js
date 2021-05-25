const axios = require('axios')

//ดึงโจทย์จาก db.json ของเราที่อยู่ใน github 
const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/BabyBbeam/Numerical-Method/"
})

const getAllRoe = () => api.get('/root-of-equation')

// function getAllRoe(){
//     return  api.get('/root-of-equation')
// }

// getAllRoe = function (){
//     return  api.get('/root-of-equation')
// }

// console.log("function beam", getAllRoe)
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