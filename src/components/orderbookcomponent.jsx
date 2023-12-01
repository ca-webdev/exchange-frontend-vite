import React from "react";
import RecentTradesComponent from "./recenttradescomponent";
import "../style/orderbook.css";

const OrderBookComponent = (props) => {
  const { orderBook } = props;

  if (!orderBook || !orderBook.askOrderBook || !orderBook.bidOrderBook) {
    return <p>Loading...</p>;
  }

  let topPrice, takerSide;
  const RecentTradesComponent = (props) => {
    const { recentTrade } = props;
    const reversedTrades = recentTrade ? [...recentTrade].reverse() : [];
    // Get the top (1) price
    topPrice = reversedTrades.length > 0 ? reversedTrades[0].price : null;
    takerSide = reversedTrades.length > 0 ? reversedTrades[0].takerSide : null;
    return topPrice;
  };

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
                className={takerSide === "B" ? "color-red" : "color-green"}
              >
                <RecentTradesComponent {...props} topPrice={topPrice} />
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  {...props}
                >
                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
                </svg>
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
