import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;
const Option = Select.Option;
class Addupdateusers extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    users: PropTypes.object,
    roles: PropTypes.array
  };
  
  render() {
    const {user,roles,setForm} = this.props
    setForm(this.props.form)  
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      //布局以及左边的内容,但是item要写label
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...formItemLayout}>
        <Item label="用户名">
          {getFieldDecorator("username", {
            initialValue: user.username,
            rules: [{ required: true, message: "请输入用户名" }]
          })(<Input placeholder="请输入用户名"></Input>)}
        </Item>
        {!user._id ? (
          <Item label="密码">
            {getFieldDecorator("password", {
              initialValue: "",
              rules: [{ required: true, message: "请输入用户名" }]
            })(<Input type="password" placeholder="请输入密码" />)}
          </Item>
        ) : null}
        <Item label="手机号">
          {getFieldDecorator("phone", {
            initialValue: user.phone,
            rules: [{ required: true, message: "请输入手机号" }]
          })(<Input placeholder="请输入手机号"></Input>)}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email", {
            initialValue: user.email,
            rules: [{ required: true, message: "请输入邮箱" }]
          })(<Input placeholder="请输入邮箱"></Input>)}
        </Item>
        <Item label="角色">
          {getFieldDecorator("role_id", {
            initialValue: user.role_id
          })(
            <Select placeholder="请选择角色">
              {
                roles.map(role=><Option key={role._id} value={role._id}>{role.name}</Option>)
              }
            </Select>

            
          )}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(Addupdateusers);
