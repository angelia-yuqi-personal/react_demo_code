import React, { Component } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './style';
import { random } from './plugin/random';
import HistoryOrder from './HostoryOrder';
import KImage from './KImage';
import moment from 'moment';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  randomOrderData() {
    var data = [];
    for (let i = 0; i < 240; i++) {
      data.push({
        id: i + 1,
        price: (random(10000, 99999) / 10000).toFixed(4),
        amount: random(10, 999999),
        time: moment('2019-01-05 00:00:00.000').valueOf() + i * 6 * 60 * 1000
      });
    }
    console.log(data);
    return {
      order: data
    };
  }

  render() {
    const orderData = this.randomOrderData().order;
    return (
      <Wrap>
        <GlobalStyle />
        <HistoryOrder orderData={orderData} />
        <KImage orderData={orderData} />
      </Wrap>
    );
  }
}
export default App;
