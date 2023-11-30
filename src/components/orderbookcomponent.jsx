import React from "react";
import "../style/orderbook.css";

const OrderBookComponent = (props) => {
  const { orderBook } = props;

  if (!orderBook || !orderBook.askOrderBook || !orderBook.bidOrderBook) {
    return <p>Loading...</p>;
  }

  const calculateCumulativeTotal = (orderBook) => {
    let cumulativeTotal = 0;

    return Object.entries(orderBook).map(([price, size]) => {
      cumulativeTotal += size;
      return cumulativeTotal;
    });
  };

  // Slice the bid and ask order books to get only the first 10 and last 10 rows respectively
  const askOrderBookSlice = Object.entries(orderBook.askOrderBook).slice(-10);
  const bidOrderBookSlice = Object.entries(orderBook.bidOrderBook).slice(0, 10);

  const askCumulativeTotal = calculateCumulativeTotal(
    Object.fromEntries(askOrderBookSlice.reverse())
  );
  const bidCumulativeTotal = calculateCumulativeTotal(
    Object.fromEntries(bidOrderBookSlice)
  );

  return (
    <div className="orderbook-content">
      <h3 className="orderbook-title">Order Book</h3>
      <div className="table-overflow">
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Size (USD)</th>
              <th>Total (USD)</th>
            </tr>
          </thead>
          <tbody>
            {askOrderBookSlice.map(([price, size], index) => (
              <tr key={index} className="color-red">
                <td>{price}</td>
                <td>{size}</td>
                <td>{askCumulativeTotal[index]}</td>
              </tr>
            ))}
            <p></p>
            {bidOrderBookSlice.map(([price, size], index) => (
              <tr key={index} className="color-green">
                <td>{price}</td>
                <td>{size}</td>
                <td>{bidCumulativeTotal[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBookComponent;
