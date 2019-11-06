import React, { useState, useReducer } from "react";
import moment from "moment";
import Week from "../../components/Week";

interface IDataValue {
  week: number;
  date: string[];
}

type stateType = {
  date: string;
  description: string;
};

type actionType = {
  name: string;
  value: string;
};

const reducer = (state: stateType, action: actionType) => {
  return {
    ...state,
    [action.name]: action.value
  };
};

const Calendar: React.FC = () => {
  // 날짜 선택
  const [selectedDate, setDate] = useState("");
  const clickDate = (day: string): void => {
    setDate(day);
  };

  // 날짜 선택 후 정보 저장
  const [state, dispatch] = useReducer(reducer, {
    date: "",
    description: ""
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(e.target);
  };

  // 오늘로부터 9주전의 날짜들 가져오기
  const period: string[] = [];
  let startDay = moment()
    .subtract(9, "weeks")
    .startOf("week")
    .format("YYYY-MM-DD");
  const endDay = moment().format("YYYY-MM-DD");

  while (startDay <= endDay) {
    period.push(startDay);
    startDay = moment(startDay)
      .add(1, "d")
      .format("YYYY-MM-DD");
  }

  const _period = period.reduce((acc: IDataValue[], row: string) => {
    if (acc.length && acc[acc.length - 1].date.length < 7) {
      acc[acc.length - 1].date.push(row);
    } else {
      acc.push({
        week: acc.length ? acc[acc.length - 1].week + 1 : 1,
        date: [row]
      });
    }

    return acc;
  }, []);

  return (
    <div className="App">
      <Week
        period={_period}
        selectedDate={selectedDate}
        clickDate={clickDate}
      />
      <div>선택된 날짜: {selectedDate}</div>
    </div>
  );
};

export default Calendar;
