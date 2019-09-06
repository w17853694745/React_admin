import React, { Component } from 'react'
import {Card,Button,Table,Modal, message} from "antd"

import LinkButton from "../../components/link-button"
import { reqGetRoles, reqAddRoles, reqUpdataRole } from "../../api/index";
import dayjs from "dayjs";

import AddroleForm from "./addrole";
import AuthForm from "./auth-form.jsx"
import memoryUtils from "../../utils/memoryUtils"
import { async } from 'q';

const Item = Table.Item
// const dataSource = ;



export default class Role extends Component {

  authRef = React.createRef()
  state={
    dataSource:[],
    addvisible:false,
    authvisible:false
  }
  //初始显示角色列表
  getroleList=async()=>{
    const result = await reqGetRoles()
    if (result.status===0) {
      const dataSource = result.data
      this.setState({
        dataSource
      })
    }
  }
  
  componentDidMount(){
    this.getroleList()
  }
  //表格头部
  columns = [
  {
    title: "角色名称",
    dataIndex: "name",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    render:create_time=>dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: "授权时间",
    dataIndex: "auth_time",
    render:auth_time=>dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: "授权人",
    dataIndex: "auth_name",
  },
  {
    title: "操作",
    render: roles=><LinkButton onClick={()=>{this.showauth(roles)}}>设置权限</LinkButton>
  }
];
//新增角色
addrole=()=>{
  this.setState({
    addvisible:true
  });
}

//新建角色确认
 addRole=async()=>{
  console.log("1111")
  this.form.validateFields((error,values)=>{
    if (!error) {
      this.roleName = values.rolename
    }
  })
  const result = await reqAddRoles(this.roleName)
  if (result.status===0) {
    message.success('添加用户成功')
    this.getroleList()
    this.setState({
      addvisible:false
    });
  }
}
//取消cancel,add和auth都使用了这个
handleCancel=()=>{
  this.form.resetFields();
  this.setState({
    addvisible: false,
  });
}
// showauth=(role)=>{
  
// }
//给角色授权
showauth=(role)=>{
  this.role = role;
  this.setState({
    authvisible: true
  });
}

updateRole= async()=>{
  
  const role = this.role

  role.menus = this.authRef.current.getMenus();
 
  role.auth_time = Date.now()
  role.auth_name = memoryUtils.user.username
  const rusult = await reqUpdataRole(role)
  if (rusult.status===0) {
    //成功
    message.success("更新权限成功")
    this.getroleList()
  }
  this.setState({
    authvisible: false
  });
}


  render() {
    const role = this.role || {}
    const { dataSource, addvisible, authvisible } = this.state;
    const title = (
      <Button type="primary" onClick={this.addrole}>
        创建角色
      </Button>
    )
    return (
      <Card title={title}>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          rowKey="_id"
          bordered={true}
          pagination={{ pageSize: 2 }}
        />
        <Modal
          title="添加角色"
          visible={addvisible}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <AddroleForm setForm={form => (this.form = form)}></AddroleForm>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={authvisible}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ authvisible: false });
          }}
        >
          <AuthForm ref={this.authRef } role={role} />
        </Modal>
      </Card>
    );
  }
}
