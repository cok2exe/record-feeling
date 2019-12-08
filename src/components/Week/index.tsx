import React from "react";
import moment from "moment";
import Day from "../Day";

interface IWeekProps {
  period: IDataValue[];
  selectedDate: string;
  setDate: (day: string) => void;
}

interface IDataValue {
  week: number;
  date: string[];
}

const Week: React.FC<IWeekProps> = ({ period, selectedDate, setDate }) => {
  return (
    <svg className="week">
      {period.map(week => (
        <g key={week.week} data-date={`${week.week}주차`}>
          {week.date.map((day, index) => (
            <Day
              key={day}
              x={(week.week - 1) * 20}
              y={index * 20}
              fill="#ebedf0"
              data-date={day}
              stroke={
                day === selectedDate
                  ? "blue"
                  : day === moment().format("YYYY-MM-DD")
                  ? "red"
                  : ""
              }
              onClick={() => setDate(day)}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

export default Week;
