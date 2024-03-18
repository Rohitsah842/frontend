import { lineChartDataType } from "@/types/LineChartData";

export interface SwpTableDataType {
  month: number;
  balanceAtBegin: number;
  withdraw: number;
  interestEarn: number;
  remainingBalance: number;
}

export const SWPCalculation = (
  investment: number,
  monthlyWithdraw: number,
  rate: number,
  time: number
) => {
  let swpData = [];

  const interestAmount = [];
  const finalAmount = [];
  const axisLabel = [];

  let swpTableData: SwpTableDataType = {
    month: 0,
    balanceAtBegin: 0,
    withdraw: 0,
    interestEarn: 0,
    remainingBalance: 0,
  };
  swpTableData = { ...swpTableData, withdraw: monthlyWithdraw };
  let r = rate / 12;
  let totalInterest = 0;

  for (var i = 1; i <= time * 12; i++) {
    axisLabel.push(i);
    swpTableData = { ...swpTableData, month: i };
    swpTableData = { ...swpTableData, balanceAtBegin: investment };
    investment = investment - monthlyWithdraw;
    let interestEarn = Math.round((investment * r) / 100);
    investment = investment + interestEarn;
    totalInterest += interestEarn;
    finalAmount.push(investment);
    interestAmount.push(totalInterest);
    swpTableData = { ...swpTableData, interestEarn: interestEarn };
    swpTableData = { ...swpTableData, remainingBalance: investment };
    swpData.push(swpTableData);
    if (investment < monthlyWithdraw) {
      break;
    }
  }
  const lineChartData: lineChartDataType[] = [
    { label: "Total interest", data: interestAmount, showMark: false },
    { label: "Final Amount", data: finalAmount, showMark: false },
  ];

  return { swpData, lineChartData, axisLabel };
};
