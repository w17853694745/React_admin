import React, { Component } from 'react'
import {Form,Input,Tree} from "antd"
import PropTypes from "prop-types"
import menuList from "../../config/menuConfig.js";

const {Item} = Form
const {TreeNode}=Tree
export default class AuthForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    let checkedKeys = [];
    const role = this.props.role;
    if (role) {
      checkedKeys = role.menus;
    }
    this.state = {
      checkedKeys
    };
  }
  getMenus=() => this.state.checkedKeys;

  handelSubmit = () => {};
  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    });
  };

  getTreeNodes = menuList => {
    //console.log(menuList)
    return menuList.reduce((pre,item)=>{
      if (!item.pubulic) {
        pre.push(
          <TreeNode title={item.title} key={item.key}>
            {item.children ? this.getTreeNodes(item.children) : null}
          </TreeNode>
        );
      }

      return pre
    },[])


    return menuList.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
    })
  }
  componentWillReceiveProps(nextprops) {
    const menus = nextprops.role.menus;
    this.setState({
      checkedKeys: menus
    });
  }

  render() {
    
    const { checkedKeys } = this.state;
    const { role } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    };
    return (
      <>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled></Input>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.getTreeNodes(menuList)}
          </TreeNode>
        </Tree>
      </>
    );
  }
}
