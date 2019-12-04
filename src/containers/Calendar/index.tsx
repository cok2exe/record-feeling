import React, { useState, useReducer } from "react";
import moment from "moment";
import Week from "../../components/Week";

interface IDataValue {
  week: number;
  date: string[];
}

type stateType = {
  color: string;
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
  const [selectedDate, setDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const clickDate = (day: string): void => {
    setDate(day);
  };

  // 날짜 선택 후 정보 저장
  const [state, dispatch] = useReducer(reducer, {
    color: "",
    description: ""
  });
  const handleChangeForInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(e.target);
  };
  const handleChangeForTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
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
      <div className="calendar__input">
        <div className="calendar__select-date">
          <label htmlFor="select_date">선택된 날짜</label>
          <input
            type="text"
            name="date"
            id="select_date"
            value={selectedDate}
            readOnly
          />
        </div>
        <div className="calendar__select-date-color">
          <label htmlFor="select_date_color">색상 설정</label>
          <input
            type="text"
            name="color"
            value={state.color}
            onChange={handleChangeForInput}
          />
        </div>
        <div className="calendar__select-date-description">
          <label htmlFor="select_date_description">
            기분이 어떤가요? (옵션)
          </label>
          <textarea
            name="description"
            id="select_date_description"
            value={state.description}
            onChange={handleChangeForTextArea}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
