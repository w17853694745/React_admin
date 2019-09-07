//包含n个action create工厂函数
import {SET_HEADER_TITLE,SEVE_USER,SHOW_MSG,LOG_OUT} from "./action_types"
import {reqLogin} from "../api/index"
import storageUtils from "../utils/storageUtils"

//设置头部标题的同步action
export const setHeaderTitle = (headerTitle) => ({
  type: SET_HEADER_TITLE,
  data: headerTitle
})

//用户登陆的同步action
const userLogin = (user) => ({
  type: SEVE_USER,
  user
})

//展示错误的同步action
const showimg = (msg)=>({
  type:SHOW_MSG,
  msg
})

//用于登陆的异步action
export function login({username, password}) {
  
  return async dispatch =>{
    //处理异步代码
    const result = await reqLogin(username, password)
    //分发请求
    if (result.status===0) {
      const user = result.data
      storageUtils.saveUser(user)
      dispatch(userLogin(user))
    }else{
      dispatch(showimg(result.msg))
    }
  }
}

export const logout = ()=>{
  storageUtils.removeUser()

  return {type:LOG_OUT}
}

