import React, { Component } from 'react';
import echarts from 'echarts';
import moment from 'moment';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 70%;
  height: 100%;
`;
const MyChart = styled.div`
  width: 100%;
  height: 100%;
`;
class KImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateTime() {
    const orderData = this.props.orderData;
    const time = orderData.map((item) => item.time);
    let data = [];
    let i = 0;
    while (i < time.length) {
      if (i % 10 === 0) {
        data.push(moment(time[i]).format('YYYY-MM-DD HH:00'));
      }
      i += 10;
    }
    console.log(data);
    return data;
  }

  generateKData() {
    const orderData = this.props.orderData;
    const price = orderData.map((item) => item.price);
    console.log(price);
    let i = 0;
    let data = [];
    let max, min, start, end;
    while (i < price.length) {
      if (i % 10 === 0) {
        max = 0;
        min = 10000;
        start = price[i];
        end = price[i + 9];
        for (let j = i; j < i + 10; j++) {
          if (price[j] > max) {
            max = price[j];
          }
          if (price[j] < min) {
            min = price[j];
          }
        }
        data.push([start, end, min, max]);
      }
      i += 10;
    }
    console.log(data);
    return data;
  }

  renderChart() {
    const myChart = echarts.init(document.getElementById('chart'));
    const time = this.generateTime();
    const data = this.generateKData();
    let option = {
      title: {
        text: 'K-line Chart'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          var res = params[0].seriesName + ' ' + params[0].name;
          res += '<br/>  开盘 : ' + params[0].value[1] + '  最高 : ' + params[0].value[4];
          res += '<br/>  收盘 : ' + params[0].value[2] + '  最低 : ' + params[0].value[3];
          return res;
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisTick: { onGap: false },
          splitLine: { show: false },
          data: time
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          boundaryGap: [0.01, 0.01]
        }
      ],
      series: [
        {
          name: 'k线图',
          type: 'k',
          data: data
        }
      ]
    };
    myChart.setOption(option);
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    const data = this.generateKData();
    return (
      <Wrap>
        <MyChart id="chart" />
      </Wrap>
    );
  }
}
export default KImage;
