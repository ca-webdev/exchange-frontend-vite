import "../style/buyselloutput.css";

const BuySellOuputComponent = (props) => {
  const { recentTrade } = props;

  const reversedTrades = recentTrade ? [...recentTrade].reverse() : [];

  return (
    <div className="buyselloutput-content">
      <h3 className="buyselloutput-title">Order History</h3>
      <div className="buyselloutput-table-overflow">
        <table>
          <tr>
            <th>Price</th>
            <th>Size</th>
            <th>Time</th>
            <th>Taker Side</th>
          </tr>
          {/* {reversedTrades.map((trade, index) => {
            const date = new Date(trade.tradeTime * 1000);
            return (
              <tr
                key={index}
                className={
                  trade.takerSide === "B" ? "color-green" : "color-red"
                }
              >
                <td>{trade.price}</td>
                <td>{trade.size}</td>
                <td>{date.toLocaleTimeString()}</td>
                <td>{trade.takerSide}</td>
              </tr>
            );
          })} */}
        </table>
      </div>
    </div>
  );
};

export default BuySellOuputComponent;
