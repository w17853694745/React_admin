import React, { Component } from 'react'
import { Card, Button, Icon, Table, message,Modal,Input} from "antd";

import  LinkButton  from "../../components/link-button/index";
import { reqCategory, reqAddCategory, reqUpdataCategory} from "../../api/index";
import CategoryForm from "./category-form";



export default class Category extends Component {
  state = {
    dataSource:[],
    status:0, //显示添加或者修改状态,0为都不显示,1显示添加,2显示修改
    loading:false
  }
  //获取分类列表
  getCategory= async()=>{
    this.setState({loading:true})
    const result = await reqCategory();
    this.setState({ loading: false });
    if (result.status===0) {
      this.setState({
        dataSource:result.data
      });
    }else{
      message.error("获取列表失败")
    }
  }
  //显示添加分类
  showAddCategory=()=>{
    this.setState({
      status:1
    })
  }
  //添加分类
  addCategory=()=>{
    this.form.validateFields(async (error,values)=>{
      if (!error) {
        //重置子组件init
        this.form.resetFields();
        const categoryName = values.categoryName;
        //发送请求
        const result = await reqAddCategory(categoryName)
        if (result.status===0) {
           message.success("添加成功");
           this.setState({
             status: 0
           });
           this.getCategory()
        }else{
          message.error(error.msg||"添加失败")
        }
       
      }
    })
  }
  //显示修改分类
  showUpdataCategory=(category)=>{
    this.category = category;
    this.setState({
      status: 2
    });
  }
  //修改分类
  updataCategory=()=>{
    this.form.validateFields(async (error, values) => {
      if (!error) {
        //重置子组件init
        this.form.resetFields();
        values.categoryId = this.category._id
        //发送请求
        const result = await reqUpdataCategory(values);
        if (result.status === 0) {
          message.success("添加成功");
          this.setState({
            status: 0
          });
          this.getCategory();
        } else {
          message.error(error.msg || "添加失败");
        }
      }
    })
  }
  //取消
  handleCancel=()=>{
    this.form.resetFields();
    this.setState({
      status: 0
    });
  }

  //获取数据
  componentWillMount(){
    this.getCategory()
  }
  
  //表格初始显示
  componentDidMount(){
    //设置表格头
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name"
      },
      {
        title: "操作",
        width: 300,
        render: category => <LinkButton onClick = {()=>this.showUpdataCategory(category)}>修改分类</LinkButton>
      }
    ];
  }

  render() {
    //取出this里的category
    const category = this.category ||{}
    const {dataSource,loading} =this.state
    return (
      <Card
        extra={
          <Button type="primary" href="#" onClick={this.showAddCategory}>
            <Icon type="plus" />
            添加
          </Button>
        }
      >
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={this.columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 2, showQuickJumper: true }} //showQuickJumper:开启快速跳转,pageSize:每页几个列表
        />
        <Modal
          title="新增分类"
          visible={this.state.status === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={(form)=>this.form=form} />
        </Modal>
        <Modal
          title="修改分类"
          visible={this.state.status === 2}
          onOk={this.updataCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm CategoryName={category.name} setForm={(form)=>this.form=form} />
        </Modal>
      </Card>
    );
  }
}
