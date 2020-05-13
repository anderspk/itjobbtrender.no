import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import "./KeywordChart.scss";
import * as db from "../../../../helpers/db";
import { colors } from "../../../../utils/colorsUtil";

// const first = "#ff6384";
// const second = "#36a2eb";

const generateDatasets = (data) => {
  return Object.keys(data).map((keyword, i) => ({
    label: keyword,
    fill: false,
    lineTension: 0.3,
    borderColor: colors[i % colors.length],
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: colors[i % colors.length],
    pointBackgroundColor: colors[i % colors.length],
    pointBorderWidth: 1,
    pointHoverRadius: 4,
    pointHoverBackgroundColor: "white",
    pointHoverBorderColor: colors[i % colors.length],
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10,
    data: data[keyword].map(({ date, count }) => ({
      x: moment(date.toDate()),
      y: count,
    })),
  }));
};

const generateDailySummariesDataset = (dailySummaries) => ({
  label: "IT-Jobbannonser totalt",
  fill: false,
  lineTension: 0.3,
  borderColor: "#00589c",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "#00589c",
  pointBackgroundColor: "#00589c",
  pointBorderWidth: 1,
  pointHoverRadius: 4,
  pointHoverBackgroundColor: "white",
  pointHoverBorderColor: "#00589c",
  pointHoverBorderWidth: 2,
  pointRadius: 3,
  pointHitRadius: 10,
  data: dailySummaries.map(({ date, totalDayAdCount }) => ({
    x: moment(date.toDate()),
    y: totalDayAdCount,
  })),
});

const generateChartOptions = (monthRange) => {
  let xAxisUnit = "week";

  if (monthRange >= 12) {
    xAxisUnit = "quarter";
  } else if (monthRange >= 3) {
    xAxisUnit = "month";
  }

  const chartOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 5,
        right: 5,
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: xAxisUnit,
            displayFormats: {
              quarter: "MMM YYYY",
            },
          },
          ticks: {
            display: true,
            autoSkip: true,
            min: moment().subtract(monthRange, "month"),
            // maxTicksLimit: 4,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          return data.datasets[tooltipItem[0].datasetIndex].data[
            tooltipItem[0].index
          ].x.format("DD MMMM, YYYY");
        },
        label: (tooltipItem, data) => {
          return tooltipItem.value;
        },
      },
    },
  };

  return chartOptions;
};

const KeywordChart = () => {
  const [dailySummaries, setDailySummaries] = useState();
  const { monthRange, chartData } = useGlobalState();

  useEffect(() => {
    const fetchDailySummary = async () => {
      const dailySummaries = await db.getdailySummariesForMonthRange(
        monthRange
      );
      setDailySummaries(dailySummaries);
    };
    fetchDailySummary();
  }, [monthRange]);

  if (!dailySummaries) {
    return <div>Loading...</div>;
  }

  const dailySummariesDataset = generateDailySummariesDataset(dailySummaries);
  const keywordsDatasets = generateDatasets(chartData);
  const graphData = {
    datasets: [dailySummariesDataset, ...keywordsDatasets],
  };

  return (
    <div className="keyword-chart">
      <Line
        options={generateChartOptions(monthRange)}
        height={100}
        data={graphData}
      />
    </div>
  );
};

export default KeywordChart;
