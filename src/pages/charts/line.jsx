import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventorys: [18, 12, 56, 40, 50, 40]
  };
  getOption = () => {
    const { sales, inventorys } = this.state;//拿到的数据
    return {
      title: {//表格的title
        text: "今日销售情况"
      },
      tooltip: {},//鼠标放上之后显示提示
      legend: {//顶部标题,可以打开/关闭,注意,这里的data必须和series一致
        data: ["今日客流量", "今日销售额"]
      },
      xAxis: {//底部
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},//这里是y轴,默认显示数值
      series: [
        {
          name: "今日客流量",
          type: "line",
          data: sales
        },
        {
          name: "今日销售额",
          type: "line",
          data: inventorys
        }
      ]
    };
  };

  update = () => {
    const sales = this.state.sales.map(sale => sale + 1);
    const inventorys = this.state.inventorys.map(inventory => inventory - 1);
    this.setState({
      sales,
      inventorys
    });
  };
  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>
            更新
          </Button>
        </Card>

        <Card title="柱状图">
          <ReactEcharts option={this.getOption()} style={{ height: 300 }} />
        </Card>
      </div>
    );
  }
}
