import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import "./login.less"
import { Form, Icon, Input, Button ,message} from "antd";
import {connect} from "react-redux"

import { login } from "../../redux/actions.js";
import {reqLogin} from "../../api/index"
import storageUtils from "../../utils/storageUtils.js"
import logo from "../../assets/images/logo.png";
import memoryUtils from '../../utils/memoryUtils';
const {Item} = Form

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const { username, password } = values;
      if (!err) {
        this.props.login(values)
        
      }
    });
  };
  validator = (rule, value, callback) => {
    if (!value) {
      callback("请输入密码");
    } else if (value.length < 4) {
      callback("密码不能小于4位");
    } else if (value.length > 12) {
      callback("密码不能大于12位");
    } else {
      callback();
    }
  };

  render() {
    const user = this.props.user

    //如果登陆
    if (user._id) {
      //debugger;
      // 自动跳转到admin
      return <Redirect to="/"></Redirect>;
    }else if (user.msg) {
      message.error("用户名或密码错误~")
    }

    const form = this.props.form;
    const getFieldDecorator = form.getFieldDecorator;
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统-登陆</h1>
        </div>
        <div className="login-content">
          
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {/* 
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
                */
              getFieldDecorator("username", {
                initialValue: "", // 指定输入框的初始值
                // 声明式验证: 使用内置的验证规则进行验证
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "必须输入用户名!"
                  },
                  { min: 4, message: "用户名不能小于4位!" },
                  { max: 12, message: "用户名不能大于12位!" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名只能包含英文、数字或下划线!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator("password", {
                initialValue: "", // 指定输入框的初始值
                rules: [{ validator: this.validatePwd }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                登 陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  
}
const wrappLogin =  Form.create()(Login)
export default connect(
  state => ({
    user: state.user
  }),
  { login }
)(wrappLogin);