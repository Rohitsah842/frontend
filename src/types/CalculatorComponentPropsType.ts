import { donoutChartDataType } from "@/components/DonoutChart";
import { InputSliderprops } from "./InputSliderProps";
import { lineChartDataType } from "./LineChartData";
import { dropDownTypes } from "./SelectDropDown";

type ColumnDefinitionType<T extends Record<string, any>, K extends keyof T> = {
  key: K;
  header: string;
};

type TableProps<T extends Record<string, any>, K extends keyof T> = {
  data: T[];
  columns: Array<ColumnDefinitionType<T, K>>;
};

export interface CalculatorComponentPropsType {
  headingTitle: String;
  inputSliderArray: InputSliderprops[];
  totalValueArray: { title: string; value: number; isShow?: boolean }[];
  donoutChartData: donoutChartDataType;
  lineChartData: {
    chartData: lineChartDataType[];
    axisData: number[];
    axisLabel: string;
  };
  tableData: TableProps<T, K>;
  isDropDown?: boolean;
  dropDown?: dropDownTypes;
}
