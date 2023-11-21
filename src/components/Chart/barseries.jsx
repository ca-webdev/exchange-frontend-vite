import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";

const BarSeries = (props) => {
  const {
    seriesDataList,
    colors: { backgroundColor = "white", textColor = "black" } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const seriesList = seriesDataList.map((series, index) => {
      const newSeries = chart.addBarSeries({
        lineColor: series.lineColor,
        topColor: series.barTopColor,
        bottomColor: series.barBottomColor,
      });

      newSeries.setData(series.data);
      return newSeries;
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      seriesList.forEach((series) => chart.removeSeries(series));
      chart.remove();
    };
  }, [seriesDataList, backgroundColor, textColor]);

  return (
    <div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default BarSeries;
