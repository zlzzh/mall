import axios from "axios";

export function request (config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  //2.1配置axios拦截器 这里面的res和err随便起的名字，use后面传两个参数，前面是成功时候调用，后面是失败时候调用
  //请求拦截request
  // 1.比如config中一些一些信息需要处理后再发送请求
  // 2.比如每次发送网络请求的时候，有一下加载圈圈 一直转，然后成功了消失
  // 3.对某些网络请求(比如登录token)判断,如果config里面没有这个参数，那就调转到登录界面
  instance.interceptors.request.use((config) => {
    //console.log(config);
    //请求成功后，必须把请求返回出去，要不后面3.发送不了真正的请求了
    return config
  },(err) => {
    //console.log(err);
  })
  //2.2响应拦截response
  instance.interceptors.response.use((res) => {
    //console.log(res);
    return res
  },(err) => {
  })
  //3.发送真正的网络请求
  return instance(config)

}