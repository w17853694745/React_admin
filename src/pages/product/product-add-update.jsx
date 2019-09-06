import React, { Component } from 'react'
import { Card, Icon, Form, Input, Button, Select, message } from "antd";

import LinkButton from "../../components/link-button/index"
import { reqCategory, reqAddUpdataProduct } from "../../api/index";
import { async } from 'q';
import PicturesWall from "./pictures-wall"
import RichTextEditor from "./rich-text-editor.jsx";

const {Item} = Form
const {Option} = Select; 
class ProductAddUpdate extends Component {

  pwRef = React.createRef() 
  edlitorRef = React.createRef()

  state = {
    categorys: []
  };
  //提交表单
  handelSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (error,values)=>{
      if (!error) {
        //收集表单输入内容
        const { name, desc, price, categoryId } = values
        console.log(name, desc, price, categoryId);
        //获取图片文件名
        const imgs = this.pwRef.current.getImgNames()
        console.log(imgs)
        //获取详情内容
        const detail = this.edlitorRef.current.getEdlitor();
        console.log(detail)
        const product = {
          name,
          desc,
          price,
          categoryId,
          imgs,
          detail
        };
        const state=this.props.location.state||{}
        const id = state._id; //这里的state就是home里传的product
        if (id) {
          product._id=id
        }

        const result = await reqAddUpdataProduct(product)
        if (result.status===0) {
          this.props.history.replace("/product")
          message.success("设置成功")

        }else{
          message.error("保存失败")
        }
      }else{
        message.error("提交表单失败")
      }
    })
  };
  //价格不能少于0
  validatorPrice=(rules,values,callback)=>{
    if (values<0) {
      callback("价格不能低于0元")
    }else{
      callback()
    }
  }

  getcategorys = async () => {
    const result = await reqCategory();
    if (result.status === 0) {
      const categorys = result.data;
      this.setState({
        categorys
      });
    }
  };

  componentDidMount() {
    this.getcategorys();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const product = this.props.location.state || {}; //避免没值的时候报错
    //console.log(product.categoryId);
    const title = (
      <LinkButton onClick={() => this.props.history.goBack()}>
        <Icon type="arrow-left" />
        <span>添加商品</span>
      </LinkButton>
    );
    const formItemLayout = {
      //布局以及左边的内容,但是item要写label
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    };
    return (
      <Card title={title}>
        <Form onSubmit={this.handelSubmit} {...formItemLayout}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: product.name,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "必须输入商品名称"
                }
              ]
            })(<Input placeholder="商品名称"></Input>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: product.desc,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "必须输入商品描述"
                }
              ]
            })(<Input placeholder="商品描述"></Input>)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: product.price && "" + product.price,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "必须输入商品价格"
                },
                {
                  validator: this.validatorPrice
                }
              ]
            })(
              <Input
                type="number"
                placeholder="商品价格"
                addonAfter="元"
              ></Input>
            )}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              initialValue: product.categoryId || "",
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "必须选择商品分类"
                }
              ]
            })(
              <Select>
                <Option value="">未选择</Option>
                {this.state.categorys.map(c => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            )}
          </Item>
          <Item label="商品图片" wrapperCol={{ span: 15 }}>
            <PicturesWall imgs={product.imgs} ref={this.pwRef}></PicturesWall>
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 18 }}>
            <RichTextEditor detail={product.detail} ref={this.edlitorRef}></RichTextEditor>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(ProductAddUpdate)