import { dateFormatDMY } from "@/utils/date-utils";
import { DatePicker } from "antd";
import { useDayJs } from "@/utils/date-utils";
import styled from "@emotion/styled";
const { RangePicker } = DatePicker;
const dayjs = useDayJs();

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate = (current) => {
  return current && current < dayjs().endOf("day");
};
const disabledRangeTime = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const StyledRangePicker = styled(RangePicker)`
  width: ${(props) => (props.size ? props.size : "100%")};
`;

export default function StartEndDate({ elmValue, onChange, isRequired }) {
  const handleChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    onChange(value, dateString);
  };

  return (
    <StyledRangePicker
      //disabledDate={disabledDate}
      value={elmValue}
      placeholder={["วันที่เริ่มงาน", "วันที่สิ้นสุดการทำงาน"]}
      format={dateFormatDMY}
      onChange={handleChange}
      status={isRequired ? "error" : ""}
    />
  );
}
