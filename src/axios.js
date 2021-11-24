import axios from 'axios';

// const mybaseURL = 'http://185.98.137.19:8001/api/';
// const mybaseURL = 'https://jsonplaceholder.typicode.com/';
// const mybaseURL = 'https://api.monitor-engine.com/api/';
// const mybaseURL = 'http://185.98.137.19/api/';
const mybaseURL = 'http://localhost:8000/api/';
// const mybaseURL = 'http://192.168.43.246:8000/api/';

const axiosInstance = axios.create({
  baseURL: mybaseURL,
  timeout: 15000,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    // Authorization: localStorage.getItem('access_token')
    //   ? `Bearer ${localStorage.getItem('access_token')}`
    //   : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  }
});
// "proxy": "http://localhost:8000",
export default axiosInstance;
