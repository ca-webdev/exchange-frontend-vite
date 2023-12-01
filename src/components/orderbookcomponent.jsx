import React, { useEffect, useState } from "react";
import "../style/orderbook.css";

const OrderBookComponent = (props) => {
  const { orderBook, recentTrade } = props;
  const reversedTrades = recentTrade ? [...recentTrade].reverse() : [];
  const [takerColor, setTakerColor] = useState("");

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

  // Slice the bid and ask order books to get only the first 10 rows respectively
  const askOrderBookSlice = Object.entries(orderBook.askOrderBook).slice(0, 12);
  const bidOrderBookSlice = Object.entries(orderBook.bidOrderBook).slice(0, 12);

  const askCumulativeTotal = calculateCumulativeTotal(
    Object.fromEntries(askOrderBookSlice.reverse())
  );
  const bidCumulativeTotal = calculateCumulativeTotal(
    Object.fromEntries(bidOrderBookSlice)
  );

  const UpdatePrice = () => {
    const topPrice = reversedTrades.length > 0 ? reversedTrades[0].price : null;
    setTakerColor(
      reversedTrades.length > 0 ? reversedTrades[0].takerSide : null
    );
    return topPrice;
  };

  return (
    <div className="orderbook-content">
      <h3 className="orderbook-title">Order Book</h3>
      <div className="table-overflow">
        <table>
          <thead>
            <tr>
              <th>Price (USD)</th>
              <th>Size</th>
              <th>Total</th>
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
            <tr>
              <td
                colSpan="3"
                style={{
                  fontWeight: "bold",
                  fontSize: "2.2em",
                  textAlign: "center",
                }}
                className={takerColor === "B" ? "color-green" : "color-red"}
              >
                <UpdatePrice />
              </td>
            </tr>
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
