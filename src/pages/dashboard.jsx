import ChartComponent from "../components/chartcomponent";
import RecentTradesComponent from "../components/recenttradescomponent";
import BuySellOuputComponent from "../components/buysellouputcomponent";

import "../style/dashboard.css";

const dashboard = (props) => {

  return (
    <div className="dashboard-content">
      <div className="recenttrade-component">
        <RecentTradesComponent {...props} />
      </div>
      <div className="chart-component">
        <ChartComponent {...props} />
        <BuySellOuputComponent {...props} />
      </div>
      <div className="recenttrade-component">
        <RecentTradesComponent {...props} />
      </div>
    </div>
  );
};

export default dashboard;
