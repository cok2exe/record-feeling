import React from "react";
import Day from "../Day";

const Week: React.FC = () => {
  const dummyData = [
    {
      week: 1,
      data: ["red", "orange", "yellow", "green", "blue", "navy", "purple"]
    },
    {
      week: 2,
      data: ["red", "orange", "yellow", "green", "blue", "navy", "purple"]
    },
    {
      week: 3,
      data: ["red", "orange", "yellow", "green", "blue", "navy", "purple"]
    }
  ];

  return (
    <svg className="week">
      {dummyData.map(week =>
        week.data.map((day, index) => (
          <Day
            key={`${week.week}_${index}`}
            x={(week.week - 1) * 20}
            y={index * 20}
            fill={day}
          />
        ))
      )}
    </svg>
  );
};

export default Week;
