import React, { Component } from 'react'

import logo from "./images/logo.png"
import "./login.less"
import { Form, Icon, Input, Button ,message} from "antd";


export default class Login extends Component {
 handleSubmit = e => {
    e.preventDefault();
    message.success("登陆失败,请稍后再试")
  };
  render() {
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统-登陆</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{width:"100%"}}
              >
                登陆系统
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
