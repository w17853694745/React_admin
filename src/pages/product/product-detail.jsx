import React, { Component } from 'react'
import {Card,Icon,List} from "antd"

import LinkButton from "../../components/link-button";
import memoryUtils from "../../utils/memoryUtils";
import "./product.less";
import { reqProduct, reqCategoryOne } from "../../api/index";
import { IMGURL } from "../../utils/constans";

const {Item} = List

export default class ProductDetail extends Component {
  state={
    product:memoryUtils.product,
    name:''
  }
  getCategory= async (categoryId)=>{
    const result2 = await reqCategoryOne(categoryId)
    const { name } = result2.data;
    this.setState({
      name
    })
  }

  async componentDidMount (){
    if (!this.state.product._id) {//内存没有商品信息
      const result = await reqProduct(this.props.match.params.id)
      if (result.status===0) {
        const product = result.data
        this.setState({
          product
        })
        //const {categoryId} = result.data
       this.getCategory(result.data.categoryId)
      }
    }else{//内存中有内存信息
      this.getCategory(this.state.product.categoryId)
    }
  }

  render() {
    const {product,name} = this.state
    const title = (
      <LinkButton onClick ={()=>this.props.history.goBack()}>
        <Icon type="arrow-left" />
        商品详情
      </LinkButton>
    );
    return (
      <Card title={title} className="product">
        <List>
          <Item>
            <span className="product-title">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="product-title">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="product-title">商品价格:</span>
            <span>{product.price}</span>
          </Item>
          <Item>
            <span className="product-title">所属分类:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="product-title">商品图片:</span>
            <span className="imgs">
              {product.imgs &&
                product.imgs.map(item => (
                  <img key={item} src={IMGURL + item} />
                ))}
            </span>
          </Item>
          <Item>
            <span className="product-title">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
          </Item>
        </List>
      </Card>
    );
  }
}
