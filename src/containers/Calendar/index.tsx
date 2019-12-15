import React, { useState, useReducer } from "react";
import moment from "moment";
import { TextField, Button } from '@material-ui/core'
import Week from "../../components/Week";

interface IDataValue {
  week: number;
  date: string[];
}

interface IFeelingValue {
  date: string;
  color: string;
  description: string;
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
  const [data, setData] = useState<IFeelingValue>({
    date: "",
    color: "",
    description: ""
  });
  // 날짜 선택
  const [selectedDate, setDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

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

  const setFeeling = ():void => {
    setData({
      date: selectedDate,
      color: state.color,
      description: state.description
    })
  };

  return (
    <div className="App">
      <Week
        period={_period}
        selectedDate={selectedDate}
        setDate={setDate}
      />
      <form className="calendar__input" onSubmit={setFeeling}>
        <form className="calendar__select-date">
          <TextField
            id="select_date"
            label="선택된 날짜"
            name="date"
            value={selectedDate}
            InputProps={{
              readOnly: true,
            }}
          />
        </form>
        <div className="calendar__select-date-color">
          <TextField
            id="select_date_color"
            label="색상 설정"
            name="color"
            value={state.color}
            onChange={handleChangeForInput}
          />
        </div>
        <div className="calendar__select-date-description">
          <TextField
            id="select_date_description"
            label="기분이 어떤가요? (옵션)"
            multiline
            rows="4"
            name="description"
            value={state.description}
            onChange={handleChangeForTextArea}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">submit</Button>

        {data.date} {data.color} {data.description}
      </form>
    </div>
  );
};

export default Calendar;
