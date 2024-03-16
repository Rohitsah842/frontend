export interface lumpsumTableDataType {
  year: number;
  investmentAmount: number;
  interestEarn: number;
  totalAmount: number;
}

export const lumpsumAmmount = (
  principle: number,
  interest: number,
  time: number
) => {
  let lumpsumData = [];

  let lumpsumTableData: lumpsumTableDataType = {
    year: 0,
    investmentAmount: 0,
    interestEarn: 0,
    totalAmount: 0,
  };

  let totalValue = Math.round(principle * Math.pow(1 + interest / 100, time));

  for (let t = 1; t <= time; t++) {
    let amount = Math.round(principle * Math.pow(1 + interest / 100, 1));
    lumpsumTableData = {
      ...lumpsumTableData,
      year: t,
      totalAmount: amount,
      investmentAmount: principle,
      interestEarn: amount - principle,
    };
    principle = amount;
    lumpsumData.push(lumpsumTableData);
  }

  return { totalValue, lumpsumData };
};
