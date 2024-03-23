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
  n: number
) => {
  const lumpsumSIPTableData: lumpsumSIPTableDataType[] = [];
  const lineChartData: lineChartDataType[] = [];

  //Line chart data variable
  const principleAmount: number[] = [];
  const totalAmount: number[] = [];
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
  const r = interest / (n * 100);

  let SIPTotalValue = Math.round(
    +investment * ((Math.pow(1 + r, time * n) - 1) / r) * (1 + r)
  );
  let lumpsumTotalValue = Math.round(
    +onetimeInvested * Math.pow(1 + interest / 100, time)
  );

  let yearlyInvested = investment * n;
  let totalMontlyInvestment = 0;
  let prevSIPInterest = 0;
  let prevLumpsumInterest = 0;
  let totalInvestedAmount = +onetimeInvested;

  for (let t = 1; t <= time; t++) {
    let SIPAmount = Math.round(
      +investment * ((Math.pow(1 + r, +n * t) - 1) / r) * (1 + r)
    );

    let lumsumInterestAmount =
      Math.round(onetimeInvested * Math.pow(1 + interest / 100, t)) -
      +onetimeInvested;
    totalMontlyInvestment += +investment * n;
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
    interestAmount.push(
      totalSIPInterest +
        lumsumInterestAmount -
        prevLumpsumInterest -
        prevSIPInterest
    );
    totalAmount.push(
      totalInvestedAmount +
        totalInvestedAmount +
        yearlyInvested +
        totalSIPInterest +
        lumsumInterestAmount
    );
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
  lineChartData.push({
    showMark: false,
    data: totalAmount,
    label: "Total return",
  });

  return { totalMaturityAmount, lumpsumSIPTableData, lineChartData, xAxisData };
};
