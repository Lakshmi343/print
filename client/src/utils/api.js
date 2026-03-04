import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(config => {
    const token = localStorage.getItem('admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const publicApi = {
    getHome: () => api.get('/public/home').then(r => r.data),
    subscribeNewsletter: (data) => api.post('/public/newsletter', data).then(r => r.data),
};

export const authApi = {
    login: (data) => api.post('/auth/login', data).then(r => r.data),
};

export const adminApi = {
    getSettings: () => api.get('/admin/settings').then(r => r.data),
    updateSettings: (data) => api.put('/admin/settings', data).then(r => r.data),

    getHero: () => api.get('/admin/hero').then(r => r.data),
    updateHero: (data) => api.put('/admin/hero', data).then(r => r.data),

    // Generic CRUD
    getList: (entity) => api.get(`/admin/${entity}`).then(r => r.data),
    create: (entity, data) => api.post(`/admin/${entity}`, data).then(r => r.data),
    update: (entity, id, data) => api.put(`/admin/${entity}/${id}`, data).then(r => r.data),
    remove: (entity, id) => api.delete(`/admin/${entity}/${id}`).then(r => r.data),

    getNewsletter: () => api.get('/admin/newsletter').then(r => r.data),
};

export default api;
