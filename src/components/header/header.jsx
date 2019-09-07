import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import dayjs from "dayjs"
import {Modal} from "antd"
import {connect} from "react-redux"

import menuList from "../../config/menuConfig"
import "./header.less"
import memoryUtils from "../../utils/memoryUtils"
import { getWeather } from "../../api//index.js";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button/index";
import {logout} from "../../redux/actions"

class Header extends Component {
  state = {
    dayPictureUrl: "",
    weather: "",
    date: ""
  };

  getTitle = menuList => {
    let title;
    const path = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem =>path.indexOf(cItem.key));
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  getWeather = async () => {
    const { dayPictureUrl, weather } = await getWeather("上海");
    this.setState({
      dayPictureUrl,
      weather
    });
  };
  getdatas = () => {
    this.timer=setInterval(() => {
      // const date = formateDate(Date.now());
      const date = dayjs().format("YYYY年MM月DD日 HH:mm:ss");
      this.setState({
        date
      });
    }, 1000);
  };

  componentDidMount() {
    this.getWeather();
    this.getdatas();
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  outLogin = () => {
    Modal.confirm({
      title: "客官,不再逛逛了吗?",
      onOk: () => {
        // 删除保存的user
        
        
        this.props.logout()
        // memoryUtils.user = {};
        // // 跳转到login
        // this.props.history.replace("/login");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  render() {
    const user = this.props.user
    //const title = this.getTitle(menuList);
    const title = this.props.headerTitle
    const { dayPictureUrl, weather, date } = this.state;
    return (
      <div className="header">
        <div className="header-top">
          <span>你好, {user.username}</span> &nbsp;
          <LinkButton onClick={this.outLogin}>退出登陆</LinkButton>
        </div>

        <div className="header-bottom">
          <div className="header-bottom-left">
            <p>{title}</p>
          </div>
          <div className="header-bottom-right">
            <span className="timer">{date}</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="werther" /> : null}
            <span className="watcher">{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(
    state => ({
      headerTitle: state.headerTitle,
      user: state.user
    }),
    { logout }
  )(Header)
);
