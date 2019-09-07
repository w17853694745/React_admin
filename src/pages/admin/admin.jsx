import React, { Component } from 'react'
import {Redirect,Switch,Route} from "react-router-dom"
import { Layout } from "antd"
import {connect} from "react-redux"

import memoryUtile from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav.jsx"
import Header from "../../components/header/header"
//引入二级路由
import Home from "../home/home"
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFind from "../not-found/not-found"

const { Footer, Sider, Content } = Layout

class Admin extends Component {
  

  render() {
    //let user = memoryUtile.user
    let user = this.props.user
    if (user&&!user._id) {
      return <Redirect to="/login" />
    }
    //const username = user.username;

    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ backgroundColor: "#fff", margin: "20px" }}>
            <Switch>
              <Redirect from="/" to="/home" exact></Redirect>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Route component={NotFind}></Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "rgba(0,0,0,.5)" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  state=>({
    user:state.user
  }),
  {}
)(Admin);