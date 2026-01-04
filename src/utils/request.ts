import axios from 'axios';

export const BASEURL = 'http://localhost:3000'

// 创建 axios 实例
const service = axios.create({
  baseURL: BASEURL , // 你的后端 API 地址
  timeout: 5000,                  // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这里获取你的 token
    // 如果是浏览器端，通常从 localStorage 获取
    // 如果是 Node 环境，可能从环境变量或全局变量获取
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    // 如果存在 token，则放入请求头
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 (按照你的要求，暂时不处理数据)
service.interceptors.response.use(
  (response) => {
    // 直接返回数据部分，通常是 response.data
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装基础方法
const request = {
  get(url: string, params = {}) {
    return service.get(url, { params });
  },

  post(url: string, data = {}) {
    return service.post(url, data);
  },

  put(url: string, data = {}) {
    return service.put(url, data);
  },

  delete(url: string, params = {}) {
    return service.delete(url, { params });
  }
};

export default request;