import "../style/recenttrade.css";

const RecentTradesComponent = (props) => {
  const { recentTrade } = props;

  return (
    <div className="recenttrade-content">
      <h3>Recent Trades</h3>
      <table>
        {recentTrade[0] &&
          recentTrade[0].data &&
          recentTrade[0].data.map((trade) => {
            return (
              <tr>
                <td>{trade.value}</td>
                <td>200</td>
                <td>{trade.time}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default RecentTradesComponent;
