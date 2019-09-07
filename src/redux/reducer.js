//reducer模块,用来包含多个reducer函数,用来管理redux的状态
import {combineReducers} from "redux"
import {
  SET_HEADER_TITLE,
  SEVE_USER,
  SHOW_MSG,
  LOG_OUT
} from "./action_types"
import storageUtils from "../utils/storageUtils"

//管理头部标题的reducer函数
const initHeaderTitle = '404'
function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}
//管理user的reducer函数
const inituser = storageUtils.getUser()
function user(state = inituser, action) {
  switch (action.type) {
    case SEVE_USER:
    return action.user
    case SHOW_MSG:
    return {...state,msg:action.msg}
    case LOG_OUT:
    return {}
    default:
      return state
  }
}

export default combineReducers({ //返回的是一个函数,状态是一个对象类型
  headerTitle,
  user
})