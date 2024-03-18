import { lineChartDataType } from "@/types/LineChartData";

export interface epfDataType {
  year: number;
  employeeContribution: number;
  employerContribution: number;
  interestEarn: number;
  totalAmount: number;
}

export const epfCalculation = (
  basicSalary: number,
  contributionPercentage: number,
  currentAge: number,
  retirementAge: number,
  currentEpfBalance: number,
  interest: number,
  incrementPer: number
) => {
  const epftableData: epfDataType[] = [];
  const totalInvestment = [];
  const totalMaturityAmount = [];
  const totalInterestAmount = [];
  const asixLabel = [];

  let epfData: epfDataType = {
    year: 0,
    employeeContribution: 0,
    employerContribution: 0,
    interestEarn: 0,
    totalAmount: 0,
  };
  let timePeriod = retirementAge - currentAge;
  let totalAmountGet = 0;
  let totalInvested = +currentEpfBalance;
  let totalInterest = 0;
  for (let t = 0; t < timePeriod; t++) {
    asixLabel.push(t + 1);
    let monthlyBasicSalary = basicSalary * Math.pow(1 + incrementPer / 100, t);
    let empolyeeContribution = Math.round(
      (monthlyBasicSalary * contributionPercentage) / 100
    );
    let employerContribution = Math.round(
      monthlyBasicSalary * 0.0833 <= 1250
        ? monthlyBasicSalary * 0.0367
        : monthlyBasicSalary * 0.0367 + monthlyBasicSalary * 0.0833 - 1250
    );

    epfData = {
      ...epfData,
      year: t + 1,
      employeeContribution: empolyeeContribution * 12,
      employerContribution: employerContribution * 12,
    };

    totalInvested += empolyeeContribution * 12 + employerContribution * 12;
    totalInvestment.push(totalInvested);

    let interestAmount = Math.round(
      ((empolyeeContribution * 12 +
        employerContribution * 12 +
        (+currentEpfBalance + totalAmountGet)) *
        interest) /
        100
    );

    totalAmountGet +=
      interestAmount + (empolyeeContribution * 12 + employerContribution * 12);
    totalInterest += interestAmount;
    totalInterestAmount.push(totalInterest);
    epfData = {
      ...epfData,
      interestEarn: interestAmount,
      totalAmount: totalAmountGet + +currentEpfBalance,
    };

    totalMaturityAmount.push(totalAmountGet + +currentEpfBalance);
    epftableData.push(epfData);
  }
  totalAmountGet = totalAmountGet + +currentEpfBalance;
  let epfLineChartData: lineChartDataType[] = [
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
  return { totalAmountGet, epftableData, epfLineChartData, asixLabel };
};
