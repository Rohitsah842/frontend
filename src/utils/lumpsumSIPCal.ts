import { lineChartDataType } from "@/types/LineChartData";

export interface lumpsumSIPTableDataType {
  year: number;
  investmentAmount: number;
  totalInvested: number;
  interestEarn: number;
  totalAmount: number;
}

export const lumpsumSIPCal = (
  investment: number,
  onetimeInvested: number,
  interest: number,
  time: number,
  noOfPayment: number
) => {
  const lumpsumSIPTableData: lumpsumSIPTableDataType[] = [];
  const lineChartData: lineChartDataType[] = [];

  //Line chart data variable
  const principleAmount: number[] = [];
  const interestAmount: number[] = [];
  const xAxisData: number[] = [];

  //Table data variable
  let tableData: lumpsumSIPTableDataType = {
    year: 0,
    investmentAmount: 0,
    totalInvested: 0,
    interestEarn: 0,
    totalAmount: 0,
  };

  // Calculation of total amount line chart data and table data
  const rate = interest / (noOfPayment * 100);

  let SIPTotalValue = Math.round(
    +investment *
      ((Math.pow(1 + rate, time * noOfPayment) - 1) / rate) *
      (1 + rate)
  );
  let lumpsumTotalValue = Math.round(
    +onetimeInvested * Math.pow(1 + interest / 100, time)
  );

  let yearlyInvested = investment * noOfPayment;
  let totalMontlyInvestment = 0;
  let prevSIPInterest = 0;
  let prevLumpsumInterest = 0;
  let totalInvestedAmount = +onetimeInvested;

  for (let t = 1; t <= time; t++) {
    let SIPAmount = Math.round(
      +investment *
        ((Math.pow(1 + rate, +noOfPayment * t) - 1) / rate) *
        (1 + rate)
    );

    let lumsumInterestAmount =
      Math.round(onetimeInvested * Math.pow(1 + interest / 100, t)) -
      +onetimeInvested;
    totalMontlyInvestment += +investment * noOfPayment;
    let totalSIPInterest = SIPAmount - totalMontlyInvestment;

    tableData = {
      ...tableData,
      investmentAmount: yearlyInvested,
      totalInvested: totalInvestedAmount,
      year: t,
      interestEarn:
        totalSIPInterest +
        lumsumInterestAmount -
        prevLumpsumInterest -
        prevSIPInterest,
      totalAmount:
        totalInvestedAmount +
        yearlyInvested +
        totalSIPInterest +
        lumsumInterestAmount,
    };

    principleAmount.push(totalInvestedAmount + yearlyInvested);
    interestAmount.push(totalSIPInterest + lumsumInterestAmount);
    xAxisData.push(t);
    prevSIPInterest = totalSIPInterest;
    prevLumpsumInterest = lumsumInterestAmount;
    totalInvestedAmount += +yearlyInvested;
    lumpsumSIPTableData.push(tableData);
  }
  const totalMaturityAmount = SIPTotalValue + lumpsumTotalValue;
  lineChartData.push({
    showMark: false,
    data: principleAmount,
    label: "Principle ",
  });
  lineChartData.push({
    showMark: false,
    data: interestAmount,
    label: "Interest",
  });
  return { totalMaturityAmount, lumpsumSIPTableData, lineChartData, xAxisData };
};
