import axios from 'axios'

export function request(config){
  const install = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  install.interceptors.request.use(config=>{
    return config
  },error => {
    console.log(error);
  })
  //响应拦截
  install.interceptors.response.use(res=>{
    return res.data
  },error => {
    console.log(error);
  })
  //发送请求
  return install(config)
}