import React, { Component } from 'react'
import {Form, Input} from "antd"
import PropTypes from "prop-types"

const {Item} = Form

class CategoryForm extends Component {
  static propTypes = {
    CategoryName:PropTypes.string,
    setForm:PropTypes.func.isRequired
  }
  
  componentWillMount(){
    //把form传递给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {CategoryName} = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: CategoryName,
            rules: [
              { required: true, whitespace: true, message: "必须填写分类名" }
            ]
          })(<Input placeholder="请输入分类名.." />)}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(CategoryForm)
