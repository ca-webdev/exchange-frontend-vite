import "../style/recenttrade.css";

const RecentTradesComponent = (props) => {
  const { recentTrade } = props;

  return (
    <div className="recenttrade-content">
      <h3>Recent Trades</h3>
      <div className="table-overflow">
        <table>
          {recentTrade &&
            recentTrade.map((trade, index) => {
              const date = new Date(trade.tradeTime);
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
            })}
        </table>
      </div>
    </div>
  );
};

export default RecentTradesComponent;
