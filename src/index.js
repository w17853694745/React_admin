/*
入口文件
*/

import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"

import App from "./App"
import store from "./redux/store"

ReactDOM.render((
<Provider store={store}>
  <App></App>
</Provider>
),document.getElementById("root"))
