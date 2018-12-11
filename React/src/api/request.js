import axios from 'axios'

export default function request({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
        let options = { url, method }
        if (method.toUpperCase() === 'GET') {
            options.params = data
        } else {
            options.data = data
        }
        return axios(options)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.token) {
                        localStorage.setItem('user', res.data.token)
                    }
                    res.data.status === 'success' ? resolve(res.data) : reject(res.data)
                } else {
                    reject(res.data)
                }
            })
            .catch(error => {
                if (error.status !== 401) {
                    reject(error.response)
                }
            })
    })
}

axios.interceptors.request.use(config => {
    const user = localStorage.getItem('user')
    if (user) {
        config.headers.common['Authorization'] = 'Bearer ' + user
    }
    return config
})