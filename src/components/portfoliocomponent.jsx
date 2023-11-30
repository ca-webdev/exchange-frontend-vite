import "../style/portfolio.css";

const PortfolioComponent = ({ portfolioData }) => {
  return (
    <div className="portfolio-content">
      <div className="portfolio-table-overflow">
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Average Entry Price</th>
              <th>Market Price</th>
              <th>Unrealized PnL</th>
              <th>Realized PnL</th>
              <th>Total PnL</th>
              <th>Initial Balance</th>
              <th>Portfolio Value</th>
              <th>Portfolio Value Change</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={
                portfolioData.portfolioValueChange > 0
                  ? "color-green"
                  : portfolioData.portfolioValueChange === 0
                  ? "color-white"
                  : "color-red"
              }
            >
              <td>{portfolioData.position}</td>
              <td>{portfolioData.averageEntryPrice}</td>
              <td>{portfolioData.marketPrice}</td>
              <td>{portfolioData.unrealizedPnL}</td>
              <td>{portfolioData.realizedPnL}</td>
              <td>{portfolioData.totalPnL}</td>
              <td>{portfolioData.initialBalance}</td>
              <td>{portfolioData.portfolioValue}</td>
              <td>{(portfolioData.portfolioValueChange * 100).toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioComponent;
