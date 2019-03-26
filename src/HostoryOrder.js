import React, { Component } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  overflow: auto;
`;
const OrderItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 20px;
`;
const TitleText = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #ccc;
`;
const PriceText = styled(TitleText)`
  color: #ff96b1;
`;
const AmountText = styled(TitleText)`
  color: #666;
`;
class HistoryOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const orderData = this.props.orderData;
    return (
      <Wrap>
        <OrderItem>
          <TitleText>Price(BTC)</TitleText>
          <TitleText>Amount(TRX)</TitleText>
          <TitleText>Total(BTC)</TitleText>
        </OrderItem>
        {orderData.map((item, index) => {
          return (
            <OrderItem key={index}>
              <PriceText>{item.price}</PriceText>
              <AmountText>{item.amount}</AmountText>
              <AmountText>{(item.price * item.amount).toFixed(4)}</AmountText>
            </OrderItem>
          );
        })}
      </Wrap>
    );
  }
}
export default HistoryOrder;
