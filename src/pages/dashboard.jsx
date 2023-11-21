import ChartComponent from "../components/chartcomponent";
import RecentTradesComponent from "../components/recenttradescomponent";

const dashboard = (props) => {
  const seriesDataList = [
    {
      lineColor: "#2962FF",
      areaTopColor: "#2962FF",
      areaBottomColor: "rgba(41, 98, 255, 0.28)",
      data: [
        {
          time: "2019-01-02",
          open: 169.71,
          high: 173.18,
          low: 169.05,
          close: 172.41,
        },
        {
          time: "2019-01-03",
          open: 171.84,
          high: 171.84,
          low: 168.21,
          close: 168.61,
        },
        {
          time: "2019-01-04",
          open: 170.18,
          high: 174.74,
          low: 169.52,
          close: 173.62,
        },
        {
          time: "2019-01-07",
          open: 173.83,
          high: 178.18,
          low: 173.83,
          close: 177.04,
        },
        {
          time: "2019-01-08",
          open: 178.57,
          high: 179.59,
          low: 175.61,
          close: 177.89,
        },
        {
          time: "2019-01-09",
          open: 177.87,
          high: 181.27,
          low: 177.1,
          close: 179.73,
        },
        {
          time: "2019-01-10",
          open: 178.03,
          high: 179.24,
          low: 176.34,
          close: 179.06,
        },
        {
          time: "2019-01-11",
          open: 177.93,
          high: 180.26,
          low: 177.12,
          close: 179.41,
        },
        {
          time: "2019-01-14",
          open: 177.59,
          high: 179.23,
          low: 176.9,
          close: 178.81,
        },
        {
          time: "2019-01-15",
          open: 176.08,
          high: 177.82,
          low: 175.2,
          close: 176.47,
        },
        {
          time: "2019-01-16",
          open: 177.09,
          high: 177.93,
          low: 175.86,
          close: 177.04,
        },
        {
          time: "2019-01-17",
          open: 174.01,
          high: 175.46,
          low: 172.0,
          close: 174.87,
        },
        {
          time: "2019-01-18",
          open: 176.98,
          high: 180.04,
          low: 176.18,
          close: 179.58,
        },
        {
          time: "2019-01-22",
          open: 177.49,
          high: 178.6,
          low: 175.36,
          close: 177.11,
        },
        {
          time: "2019-01-23",
          open: 176.59,
          high: 178.06,
          low: 174.53,
          close: 176.89,
        },
        {
          time: "2019-01-24",
          open: 177.0,
          high: 177.53,
          low: 175.3,
          close: 177.29,
        },
        {
          time: "2019-01-25",
          open: 179.78,
          high: 180.87,
          low: 178.61,
          close: 180.4,
        },
        {
          time: "2019-01-28",
          open: 178.97,
          high: 179.99,
          low: 177.41,
          close: 179.83,
        },
        {
          time: "2019-01-29",
          open: 178.96,
          high: 180.15,
          low: 178.09,
          close: 179.69,
        },
        {
          time: "2019-01-30",
          open: 180.47,
          high: 184.2,
          low: 179.78,
          close: 182.18,
        },
        {
          time: "2019-01-31",
          open: 181.5,
          high: 184.67,
          low: 181.06,
          close: 183.53,
        },
        {
          time: "2019-02-01",
          open: 184.03,
          high: 185.15,
          low: 182.83,
          close: 184.37,
        },
      ],
    },
  ];

  const recentTrade = [
        {
      lineColor: "#2962FF",
      areaTopColor: "#2962FF",
      areaBottomColor: "rgba(41, 98, 255, 0.28)",
      data: [
        { time: "2022-12-22", value: 32.51 },
        { time: "2022-12-23", value: 31.11 },
        { time: "2022-12-24", value: 27.02 },
        { time: "2022-12-25", value: 27.32 },
        { time: "2022-12-26", value: 25.17 },
        { time: "2022-12-27", value: 28.89 },
        { time: "2022-12-28", value: 25.46 },
        { time: "2022-12-29", value: 23.92 },
        { time: "2022-12-30", value: 22.68 },
        { time: "2022-12-31", value: 22.67 },
      ],
    },
  ]
  

  return (
    <>
      {/* <button type="button" onClick={() => setStarted((current) => !current)}>
        {started ? "Stop updating" : "Start updating series"}
      </button> */}
      <ChartComponent {...props} seriesDataList={seriesDataList} recentTrade={recentTrade}/>
      <RecentTradesComponent {...props} recentTrade={recentTrade}/>
    </>
  );
};

export default dashboard;
