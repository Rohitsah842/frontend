export interface SIPTableDataType {
  year: number;
  investmentAmount: number;
  interestEarn: number;
  totalAmount: number;
}

export const sipInterestAmt = (
  investment: number,
  interest: number,
  time: number,
  n: number
) => {
  let SIPTableData = [];
  let tableData = {
    year: 0,
    investmentAmount: 0,
    interestEarn: 0,
    totalAmount: 0,
  };
  const i = interest / (n * 100);
  let SIPTotalValue = Math.round(
    investment * ((Math.pow(1 + i, time * n) - 1) / i) * (1 + i)
  );
  let yearlyInvestment = investment;
  for (let t = 1; t <= time * n; t++) {
    let amount = Math.round(
      investment * ((Math.pow(1 + i, 1) - 1) / i) * (1 + i)
    );
    tableData = {
      ...tableData,
      investmentAmount: yearlyInvestment,
      year: t,
      interestEarn: amount - investment,
      totalAmount: amount,
    };
    investment = amount + yearlyInvestment;
    SIPTableData.push(tableData);
  }
  console.log(SIPTableData, time);

  return { SIPTotalValue, SIPTableData };
};
