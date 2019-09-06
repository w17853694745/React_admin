import axios from "axios"
import {message} from "antd"
import qs from "qs"


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