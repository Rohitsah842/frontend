import { sipInterestAmt } from "./sipInterestCal";
import { lumpsumAmmount } from "./lumpSumCal";
import { lineChartDataType } from "@/types/LineChartData";

export const sipLineChartDataCal = (
  p: number,
  r: number,
  n: number,
  investmentType: string
) => {
  const principleAmount: number[] = [];
  const totalAmount: number[] = [];
  const interestAmount: number[] = [];
  const xAxisData: number[] = [];
  const lineChartData: lineChartDataType[] = [];

  if (investmentType === "SIP") {
    for (var i = 2; i <= 24; i += 2) {
      xAxisData.push(i);
      var value = sipInterestAmt(p, r, i, n);
      principleAmount.push(p * i * n);
      totalAmount.push(value);
      interestAmount.push(value - p * i * n);
    }
  }
  // if(investmentType==="lumpsum"){
  //         for(var i=1; i<=40;i++){
  //            var value=  lumpsumAmmount(p, r, i);
  //            principleAmount.push(p*i*n);
  //            totalAmount.push(value);
  //            interestAmount.push(value-(p*i*n))
  //         }
  //     }
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

  return { lineChartData, xAxisData };
};
