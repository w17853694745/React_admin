import React, { Component } from 'react'
import{Card,Button,Table,Modal, message} from "antd"

import LinkButton from "../../components/link-button"
import {
  reqGetusers,
  reqGetRoles,
  updataoradduser,
  deleteuser
} from "../../api/index";
import dayjs from "dayjs";

import Addupdateusers from "./add&updateusers.jsx";
import { async } from 'q';

const {confirm} = Modal
export default class User extends Component {
  state={
    users:[],
    roles:[],
    isshow:false
  }

  componentDidMount(){
    this.getusers()
  }
  
  getusers=async()=>{
    const result = await reqGetusers()
    if (result.status===0) {
      const {users,roles} = result.data
      this.roleNames=roles.reduce((pre,item)=>{  
        pre[item._id]=item.name
        return pre
      },{})
      this.setState({
        users,
        roles
      })
    }
  }
  //删除用户
  deleteuser= async(userId)=>{
    confirm({
      title: "删除用户",
      content:
        "确定要删除该用户吗?",
      onOk:async()=> {
        const result = await deleteuser(userId)
        this.setState({
          isshow:false
        })
        this.getusers()
        if (result.status===0) {
          //删除成功
          message.success("删除角色成功")
        }
      },
      onCancel() {}
    });

    
  }

  columns=[
    {
      title:"用户名",
      dataIndex:"username"
    },
    {
      title:"邮箱",
      dataIndex:"email"
    },
    {
      title:"电话",
      dataIndex:"phone"
    },
    {
      title:"注册时间",
      dataIndex:"create_time",
      render:create_time=>dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title:"所属角色",
      dataIndex:"role_id",
      //render:role_id=>this.state.roles.find(role=>role._id===role._id).name
      render:role_id=>this.roleNames[role_id]
    },
    {
      title:"操作",
      render:users=>(
        <>
        <LinkButton onClick = {()=>this.showupdateUser(users)} >修改</LinkButton>
        <LinkButton onClick = {()=>this.deleteuser(users._id)}>删除</LinkButton>
        </>
      )
    }
  ]

  addOrUpdate= async()=>{
    const user = this.form.getFieldsValue()//获取所以收集的内容
    this.form.resetFields();//重置输入框
    if (this.user) {
      //修改
      user._id = this.user._id
    }
    this.setState({
      isshow:false
    })
    const result = await updataoradduser(user)
    if (result.status === 0) {
      message.success("用户操作成功")
      this.getusers()
    }else{
      message.error("用户操作失败")
    }
  }
  
  showupdateUser=(user)=>{
    this.user = user
     this.setState({
       isshow: true
     });
  }

  showaddUser=()=>{
    this.user = null;
    this.setState({
      isshow: true
    });
  }

  handleCancel=()=>{
    this.setState({
      isshow:false
    })
  }

  render() {

    const { users, isshow, roles } = this.state;
    const user = this.user||{}
    const title = (
      <Button type="primary" onClick = {this.showaddUser}>
        创建用户
      </Button>
    )
    return (
      <Card title={title}>
        <Table dataSource={users} columns={this.columns} rowKey="_id" pagination={{defaultPageSize:2}}/>
        <Modal
          title="添加用户"
          visible={isshow}
          onOk={this.addOrUpdate}
          onCancel={this.handleCancel}
        >
          <Addupdateusers 
            setForm ={form =>this.form = form}
            user={user}
            roles={roles}
          >

          </Addupdateusers>
        </Modal>
      </Card>
    );
  }
}
