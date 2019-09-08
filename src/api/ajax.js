import axios from "axios"
import {message} from "antd"
import qs from "qs"
//标识需要发送ajax请求,生产环境才需要
/* 
注意:这段代码只有在解决跨域的时候才能使用,如果把内容放在服务器上,就不需要这段代码,不然会报错
*/
axios.defaults.baseURL=process.env.NODE_ENV==="production"?"/react_api":""
axios.interceptors.request.use(
  config =>{
    const data = config.data
    if (data && data instanceof Object) {
      config.data = qs.stringify(data)
    }
    return config
  }
)
axios.interceptors.response.use(
  response=>{
    return response.data
  },
  error=>{
    message.error("error in ajax",error.message)
    return new Promise(()=>{})
  }
)

export default axios