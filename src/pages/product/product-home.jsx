import React, { Component } from 'react'
import {Card,Select,Input,Icon,Button,Table, message} from "antd"

import LinkButton from "../../components/link-button";
import { reqProducts, reqSeachProducts, requpdataProduct} from "../../api/index";
import memoryUtils from "../../utils/memoryUtils";

const { Option } = Select;

export default class ProductHome extends Component {
  state={
    dataSource:[],
    total:0,
    searchType:"productName",
    searchName:""
  }
  getProducts= async (pageNum)=>{
    this.current = pageNum;
    let result;
    const { searchType, searchName } = this.state;
    if (this.seach && searchName) {
      result = await reqSeachProducts({
        pageNum,
        pageSize: 2,
        searchType,
        searchName
      });
    } else {
      result = await reqProducts(pageNum);
    }
    if (result.status===0) {
      //成功
      const { list, total } = result.data;
      //修改状态,初始显示
      this.setState({
        dataSource:list,
        total
      });
    }else{
      //失败
      message.error("请求商品列表失败")
    }
  }
  //更新商品信息
  updataStatus= async (productId, status)=>{
    const result = await requpdataProduct(productId, status)
    if (result.status===0) {
      //成功
      message.success("更新状态成功")
      this.getProducts(this.current)
    }else{
      //失败
      message.error("更新状态失败");

    }
  }

  // //name/desc搜索
  // searchproduct= async(pageNum)=>{
  //   const {searchType,searchName} = this.state
  //   const result = await reqSeachProducts({
  //     pageNum,
  //     pageSize: 2,
  //     searchType,
  //     searchName
  //   })
  //   if (result.status===0) {
  //     //成功
  //     const {total,list} = result.data
  //     this.setState({
  //       dataSource:list,
  //       total
  //     });
  //   }else{
  //     //失败
  //     console.log("---")
  //   }
  // }

  //初始化columns
  componentWillMount(){
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        width: 150,
        dataIndex: "price",
        render: price => "$" + price
      },
      {
        title: "状态",
        width: 150,
        //dataIndex: "status",
        render: ({ status, _id }) => {
          let text = "在售";
          let btntext = "下架";
          if (status === 2) {
            text = "已下架";
            btntext = "上架";
          }
          return (
            <span>
              <Button
                type="primary"
                onClick={() => {

                  this.updataStatus(_id,status===1?2:1);
                }}
              >
                {btntext}
              </Button>
              <p>{text}</p>
            </span>
          );
        }
      },
      {
        title: "操作",
        width: 100,
        render: product => {
          return (
            <span>
              <LinkButton
                onClick = {
                  ()=>{
                    memoryUtils.product = product
                    this.props.history.push(`/product/detail/${product._id}`)
                  }
                }
              >详情
              </LinkButton>
              <LinkButton onClick = {()=>{
                this.props.history.push("/product/addupdate",product)
              }}>修改</LinkButton>
            </span>
          );
        }
      }
    ];
  }

  componentDidMount(){
    this.getProducts(1)
  }

  render() {
    const { dataSource, total, searchType } = this.state;
    const title = (
      <div>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option key="1" value="productName">
            按名称搜索
          </Option>
          <Option key="2" value="productDesc">
            按描述搜索
          </Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 200, margin: "0 15px" }}
          onChange={(event) => this.setState({ searchName:event.target.value })}
        />
        <Button type="primary" onClick = {()=>{
          this.seach = true;
          this.getProducts(1);
        }}>搜索</Button>
      </div>
    );
    const extra = (
      <Button type="primary" onClick={()=>this.props.history.push("/product/addupdate")}>
        <Icon type="plus" ></Icon>
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          rowKey="_id"
          bordered
          pagination={{
            showQuickJumper:true,
            current: this.current, // 当前选中哪个页码
            pageSize: 2,//每页几条数据
            total,
            // onChange: (page) => this.getProducts(page)
            onChange: this.getProducts,//直接调用这个函数,传入两个参数
          }}
        />
        ;
      </Card>
    );
  }
}
