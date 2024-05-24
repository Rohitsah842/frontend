import { sipInterestAmt } from "./sipInterestCal";
import { lumpsumAmmount } from "./lumpSumCal";
import { lineChartDataType } from "@/types/LineChartData";

/**
 *
 * @param principle Please enter principle amount
 * @param rate Rate of interest
 * @param noOfPayment no of payment in years
 * @param time no of years
 * @param investmentType investment type like SIP, LUMSUM
 * @returns
 */

export const sipLineChartDataCal = (
  principle: number,
  rate: number,
  noOfPayment: number,
  time: number,
  investmentType: string | undefined
) => {
  const principleAmount: number[] = [];
  const interestAmount: number[] = [];
  const xAxisData: number[] = [];
  const lineChartData: lineChartDataType[] = [];

  if (investmentType === "SIP") {
    for (var i = 1; i <= time; i++) {
      xAxisData.push(i);
      var value = sipInterestAmt(principle, rate, i, noOfPayment).SIPTotalValue;
      principleAmount.push(principle * i * noOfPayment);
      interestAmount.push(value - principle * i * noOfPayment);
    }
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
  } else if (investmentType === "Lumpsum") {
    for (var i = 1; i <= time; i++) {
      xAxisData.push(i);
      var value = lumpsumAmmount(principle, rate, i).totalValue;
      principleAmount.push(principle);
      interestAmount.push(value - principle);
    }
    lineChartData.push({
      showMark: false,
      data: interestAmount,
      label: "Interest",
    });
    lineChartData.push({
      showMark: false,
      data: principleAmount,
      label: "Principle Amount",
    });
  }

  return { lineChartData, xAxisData };
};
