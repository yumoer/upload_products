import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'http://192.168.1.59:8000/',
    baseURL: 'http://47.94.106.106:8000/',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
  config => {
    console.log(config)
    //localStorage中获取token
    if(localStorage.getItem("ms_userInfo")){
      let token = JSON.parse(localStorage.getItem("ms_userInfo")).data.token;
      console.log(token)
      if(token !== null){
        config.headers = {
          'Authorization': 'JWT ' +token
        }
      }
    }
    return config;
  },
  error => {
    console.log(error.response.status);
   /* if(error.response.status === 401){
      this.vm.$route.push('/login')
    }*/
    return Promise.reject(error);
  }
);

export default service;
