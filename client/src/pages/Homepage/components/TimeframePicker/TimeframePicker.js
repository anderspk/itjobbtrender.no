import React from "react";
import "./TimeframePicker.scss";
import { useGlobalState } from "../../../../providers/GlobalProvider";

const TimeframePicker = () => {
  const { monthRange, handleNewMonthRange } = useGlobalState();

  return (
    <div className="timeframe-picker">
      <h2>
        Vis for siste{" "}
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
  );
};
export default TimeframePicker;
