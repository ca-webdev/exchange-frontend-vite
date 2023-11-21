import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const AreaSeries = (props) => {
  const {
    recentTrade,
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

    const seriesList = recentTrade.map((series, index) => {
      const newSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        areaTopColor: "#2962FF",
        areaBottomColor: "rgba(41, 98, 255, 0.28)",
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
  }, [recentTrade, backgroundColor, textColor]);

  return (
    <div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default AreaSeries;
