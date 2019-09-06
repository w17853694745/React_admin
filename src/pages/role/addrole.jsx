import React, { Component } from 'react'
import {Form,Input} from "antd"
import PropTypes from "prop-types"

const Item = Form.Item
class AddroleForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  };

  state = {
    rolename: ""
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    this.props.setForm(this.props.form);////把from交给父组件

    const formItemLayout = {
      //布局以及左边的内容,但是item要写label
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handelSubmit}>
        <Item label="角色名称">
          {getFieldDecorator("rolename", {
            initialValue: "",
            
            rules: [{ required: true, message: "必须输入角色名称" }]
          })(<Input  placeholder="请输入角色名称"></Input>)}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(AddroleForm)
