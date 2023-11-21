const RecentTradesComponent = (props) => {
  const { recentTrade } = props;

  return (
    <>
      <h2>Recent Trades</h2>
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
    </>
  );
};

export default RecentTradesComponent;
