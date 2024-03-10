import { monthlyEMI } from './loanEMICal';
import { lumpsumAmmount } from './lumpSumCal';

// interface loanEMIDataType{
//     month:number,
//     loanAmount:number,
//     monthlyPayment: number,
//     interest:number,
//     remainingLoan: number
// }

export interface EMITableDataType{
    month:number,
    openingBalance:number,
    EMI:number,
    monthlyInterestPaid:number,
    monthlyPrinciplePaid:number,
    closingBalance:number
}

export const loanEMIData =(loanAmount: number, interest: number, t:number):EMITableDataType[]=>{
    let EMIdata=[];
    let EMITableData: EMITableDataType={
        month:0,
        openingBalance:0,
        EMI:0,
        monthlyInterestPaid:0,
        monthlyPrinciplePaid:0,
        closingBalance:0

    }

    let r=interest/12;
    let EMI=monthlyEMI(loanAmount, interest, t);
    EMITableData={...EMITableData, EMI:EMI};
    for(let i=1;i<=t*12;i++){
      
      EMITableData={...EMITableData, month:i, openingBalance:loanAmount}
    let interestAmt=  lumpsumAmmount(loanAmount, r,1)-loanAmount;
      loanAmount=(loanAmount-EMI)+interestAmt>0?(loanAmount-EMI)+interestAmt:0;
      EMITableData={...EMITableData, monthlyInterestPaid:interestAmt, monthlyPrinciplePaid:EMI-interestAmt,closingBalance: loanAmount};

      EMIdata.push(EMITableData);
      
    }
    return EMIdata;

}