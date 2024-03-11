import { lineChartDataType } from "@/types/LineChartData";
import { monthlyEMI } from "./loanEMICal";
import { lumpsumAmmount } from "./lumpSumCal";

export interface EMITableDataType {
  month: number;
  openingBalance: number;
  EMI: number;
  monthlyInterestPaid: number;
  monthlyPrinciplePaid: number;
  closingBalance: number;
}

export const loanEMIData = (
  loanAmount: number,
  interest: number,
  t: number
) => {
  let EMIdata = [];
  let EMIChartData: lineChartDataType[] = [];

  let EMITableData: EMITableDataType = {
    month: 0,
    openingBalance: 0,
    EMI: 0,
    monthlyInterestPaid: 0,
    monthlyPrinciplePaid: 0,
    closingBalance: 0,
  };

  let interestPaidAmount: number[] = [];
  let principlePaidAmount: number[] = [];
  let remainingLoanAmount: number[] = [];
  let axisLabel: number[] = [];
  var sum1 = 0;
  var sum2 = 0;

  let r = interest / 12;
  let EMI = monthlyEMI(loanAmount, interest, t);
  EMITableData = { ...EMITableData, EMI: EMI };
  for (let i = 0; i < t * 12; i++) {
    axisLabel.push(i + 1);
    EMITableData = {
      ...EMITableData,
      month: i + 1,
      openingBalance: loanAmount,
    };
    let interestAmt = lumpsumAmmount(loanAmount, r, 1) - loanAmount;
    sum1 += interestAmt;
    interestPaidAmount.push(sum1);
    loanAmount =
      loanAmount - EMI + interestAmt > 0 ? loanAmount - EMI + interestAmt : 0;
    remainingLoanAmount.push(loanAmount);
    sum2 += EMI - interestAmt;
    principlePaidAmount.push(sum2);
    EMITableData = {
      ...EMITableData,
      monthlyInterestPaid: interestAmt,
      monthlyPrinciplePaid: EMI - interestAmt,
      closingBalance: loanAmount,
    };

    EMIdata.push(EMITableData);
  }
  EMIChartData.push({
    label: "Interest Paid",
    data: interestPaidAmount,
    showMark: false,
  });
  EMIChartData.push({
    label: "Principle Paid",
    data: principlePaidAmount,
    showMark: false,
  });
  // EMIChartData.push({
  //   label: "Remaining Loan",
  //   data: remainingLoanAmount,
  //   showMark: false,
  // });
  return { EMIdata, EMIChartData, axisLabel };
};
