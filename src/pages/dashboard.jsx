import ChartComponent from "../components/chartcomponent";
import RecentTradesComponent from "../components/recenttradescomponent";

import "../style/dashboard.css";

const dashboard = (props) => {
  const { ohlc, recentTrade } = props;

  return (
    <div className="dashboard-content">
      <div className="chart-component">
        <ChartComponent
          {...props}
          ohlc={ohlc}
          recentTrade={recentTrade}
        />
      </div>
      <div className="recenttrade-component">
        <RecentTradesComponent {...props} recentTrade={recentTrade} />
      </div>
    </div>
  );
};

export default dashboard;
