import { lineChartDataType } from "@/types/LineChartData";
import { lumpsumAmmount } from "./lumpSumCal";

export interface sukanyaTableDataType {
  year: number;
  investedAmount: number;
  interestEarn: number;
  totalAmount: number;
}

export const sukanyaSamriddhiYojanaCal = (
  depositeAmount: number,
  interest: number,
  startYear: number,
  noOfPayment: number
) => {
  const sukanyatableData: sukanyaTableDataType[] = [];
  const totalInvestment = [];
  const totalMaturityAmount = [];
  const totalInterestAmount = [];
  const axisLabel = [];

  let sukanyaData: sukanyaTableDataType = {
    year: 0,
    investedAmount: 0,
    interestEarn: 0,
    totalAmount: 0,
  };

  let totalAmountAcumulated = 0;
  let totalInvested = 0;
  let totalInterest = 0;
  let yearlyInterest = 0;

  const rate = interest / (noOfPayment * 100);
  let investement = +depositeAmount;

  for (let t = 1; t <= 15 * noOfPayment; t++) {
    let interestGet = Math.round(investement * rate);
    totalAmountAcumulated += +depositeAmount + interestGet;
    yearlyInterest = yearlyInterest + interestGet;
    if (t % noOfPayment === 0) {
      axisLabel.push(t / noOfPayment);
      totalInvested += +depositeAmount * noOfPayment;
      totalInterest += yearlyInterest;
      totalInvestment.push(totalInvested);
      totalInterestAmount.push(totalInterest);
      sukanyaData = {
        ...sukanyaData,
        year: t / noOfPayment,
        investedAmount: +depositeAmount * noOfPayment,
        interestEarn: yearlyInterest,
        totalAmount: totalAmountAcumulated,
      };
      sukanyatableData.push(sukanyaData);
      investement += +yearlyInterest;
      yearlyInterest = 0;
      totalMaturityAmount.push(totalAmountAcumulated);
    }
    investement += +depositeAmount;
  }

  for (let t = 16; t <= 21; t++) {
    axisLabel.push(t);
    totalInvested += 0;
    totalInvestment.push(totalInvested);
    let amount = lumpsumAmmount(totalAmountAcumulated, interest, 1).totalValue;
    totalInterest += amount - totalAmountAcumulated;
    totalInterestAmount.push(totalInterest);
    totalMaturityAmount.push(amount);

    sukanyaData = {
      ...sukanyaData,
      year: t,
      investedAmount: 0,
      interestEarn: amount - totalAmountAcumulated,
      totalAmount: amount,
    };
    sukanyatableData.push(sukanyaData);
    totalAmountAcumulated = amount;
  }

  let sukanyaLineChartData: lineChartDataType[] = [
    { label: "Total amount invested", data: totalInvestment, showMark: false },
    {
      label: "Total interest Amount",
      data: totalInterestAmount,
      showMark: false,
    },
    {
      label: "Amount after Maturity",
      data: totalMaturityAmount,
      showMark: false,
    },
  ];
  return {
    totalAmountAcumulated,
    totalInvested,
    sukanyatableData,
    sukanyaLineChartData,
    axisLabel,
  };
};
