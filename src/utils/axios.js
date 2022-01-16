import axios from 'axios'

export const withoutAuth = axios.create({
  baseURL: 'https://swapi.py4e.com/api/people',
  // timeout: 5000
})

const withAuth = axios.create({
  baseURL: 'https://swapi.py4e.com/api/people/',
  // timeout: 50000
})

withAuth.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export { withAuth }
