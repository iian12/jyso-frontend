import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post('http://localhost:8080/api/v1/auth/reissue', null, {
                    headers: { 'Authorization': `Bearer ${refreshToken}` },
                });

                const { accessToken: newAccessToken } = response.data;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (reissueError) {
                console.error('Token reissue failed', reissueError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(reissueError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
