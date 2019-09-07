import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom"
import {connect} from "react-redux"

import { setHeaderTitle } from "../../redux/actions";
import Logo from "../../assets/images/logo.png"
import "./left-nav.less"
import menuList from "../../config/menuConfig"
import memoryUtils from '../../utils/memoryUtils';

const {Item,SubMenu} = Menu

class LeftNav extends Component {
  hasAuth = item => {
    const user = this.props.user
    const menus = user.role.menus;
    if (
      user.username === "admin" ||
      item.pubulic ||
      menus.indexOf(item.key) != -1
    ) {
      return true;
    } else if (item.children) {
      return item.children.some(cItem => menus.indexOf(cItem.key) != -1);
    }
    return false;
  };

  click=(title)=>{

    this.props.setHeaderTitle(title); 
  }

  getmenu = menuList => {
    let path = this.props.location.pathname;
   
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        //设置标题
        if (path.indexOf(item.key)===0) { 
          this.click(item.title);
        }
        if (!item.children) {
           pre.push(
             <Item key={item.key}>
               <Link
                 to={item.key}
                 onClick={()=>{this.click(item.title)}} 
               >
                 <Icon type={item.icon} />
                 <span>{item.title}</span>
               </Link>
             </Item>
           );
        } else {
          // 请求的路由路径对应children中某个
          if (item.children.some(item =>path.indexOf(item.key)===0)) {
            // 将item的key保存为openKey
            this.openKey = item.key;
          }

          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getmenu(item.children)}
            </SubMenu>
          );
        }
      }
      return pre;

    }, []);
  };

  render() {
    const menuList2 = this.getmenu(menuList);
    let select = this.props.location.pathname;
    // const selected = this.getselected(menuList);
    if (select.indexOf("/product/")===0) {
      select ="/product"
    }

    return (
      <div>
        <Link to="/home" className="left-nav">
          <img src={Logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={[select]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {menuList2}
        </Menu>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: state.user
    }),
    { setHeaderTitle }
  )(LeftNav)
);