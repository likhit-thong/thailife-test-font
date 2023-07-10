import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const dateFormatDMY = "DD/MM/YYYY";
export const weekFormat = "MM/DD";
export const monthFormat = "YYYY/MM";

dayjs.extend(customParseFormat);

export const useDayJs = () => dayjs;
