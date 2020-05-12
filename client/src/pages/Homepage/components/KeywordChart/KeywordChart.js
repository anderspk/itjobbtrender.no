import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import "./KeywordChart.scss";
import * as db from "../../../../helpers/db";

const first = "#ff6384";
const second = "#36a2eb";

const generateDatasets = (data) => {
  return Object.keys(data).map((keyword) => ({
    label: keyword,
    fill: false,
    lineTension: 0.3,
    backgroundColor: "rgba(75,192,192,0.4)",
    borderColor: first,
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: first,
    pointBackgroundColor: first,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: first,
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10,
    data: data[keyword].map(({ date, count }) => ({
      x: moment(date.toDate()),
      y: count,
    })),
  }));
};

const generateDailySummariesDataset = (dailySummaries) => {
  return {
    label: "Annonser Totalt",
    fill: false,
    lineTension: 0.3,
    backgroundColor: "rgba(33,150,243,0.4)",
    borderColor: "rgba(33,150,243)",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: "rgba(33,150,243)",
    pointBackgroundColor: "rgba(33,150,243)",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(33,150,243)",
    pointHoverBorderColor: "rgba(33,150,243,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10,
    data: dailySummaries.map(({ date, totalDayAdCount }) => ({
      x: moment(date.toDate()),
      y: totalDayAdCount,
    })),
  };
};

const KeywordChart = () => {
  const [dailySummaries, setDailySummaries] = useState();
  const { monthRange, handleNewMonthRange, chartData } = useGlobalState();

  console.log({ dailySummaries });

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
      <div className="chart-header">
        <h2>
          Antall ganger nevnt de siste{" "}
          <select
            value={monthRange}
            onChange={(e) => handleNewMonthRange(e.target.value)}
          >
            <option value={1}>1 Måned</option>
            <option value={3}>3 Måneder</option>
            <option value={6}>6 Måneder</option>
            <option value={12}>1 år</option>
          </select>
        </h2>
      </div>
      <Line
        options={{
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "month",
                },
                ticks: {
                  display: true,
                  // autoSkip: true,
                  min: moment().subtract(monthRange, "month"),
                  maxTicksLimit: 4,
                  // min: 4,
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
        }}
        height={100}
        data={graphData}
      />
    </div>
  );
};

export default KeywordChart;
