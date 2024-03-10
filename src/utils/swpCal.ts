import { lumpsumAmmount } from "./lumpSumCal";


export interface SwpTableDataType{
    month:number,
    balanceAtBegin:number,
    withdraw:number,
    interestEarn:number,
    remainingBalance:number
}

export const SWPCalculation=(investment:number, monthlyWithdraw: number, rate: number, time:number): SwpTableDataType[]=>{
    let swpData=[];
    let swpTableData: SwpTableDataType={
            month:0,
            balanceAtBegin:0,
            withdraw:0,
            interestEarn:0,
            remainingBalance:0
    }
    swpTableData={...swpTableData, withdraw:monthlyWithdraw };
    let r=rate/(12);

    for(var i=1; i<=time*12; i++){
        
        swpTableData={...swpTableData, month:i }
        swpTableData={...swpTableData, balanceAtBegin:investment }
        investment= investment-monthlyWithdraw;
       let interestEarn=  lumpsumAmmount(investment, r,1)-investment;
       investment= (investment+interestEarn);
        swpTableData={...swpTableData, interestEarn:interestEarn }
        swpTableData={...swpTableData, remainingBalance:investment }
        swpData.push(swpTableData);
        if(investment<monthlyWithdraw){
            break;
        }
    }
    

    return swpData;

}