import axios from 'axios';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



// TODO: Change baseURL to process.env.REACT_APP_API_URL
const API = axios.create({
    baseURL: 'http://localhost:18500/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
    },
    withCredentials: true
})

API.interceptors.request.use((config) => {
    const csrftoken = getCookie('csrftoken');
    config.headers['X-CSRFToken'] = csrftoken;
    return config;
})

// Required for RTK Query / Mutations
export const axiosBaseQuery = () =>
    async ({url, method, data, params}) => {
        try {
            const result = await API({url, method, data, params})
            return {data: result.data}
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export default API;
