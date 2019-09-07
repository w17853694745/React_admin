// Store模块
//创建store对象,以及使用中间件的applyMiddleware
import {createStore,applyMiddleware} from "redux"
//中间件,可以让store使用异步编程(返回一个函数)
import thunk from "redux-thunk"
//使用redux-devtools
import {composeWithDevTools} from "redux-devtools-extension"

//负责状态的reducer函数
import reducer from "./reducer"

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))