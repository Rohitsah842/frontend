export const lumpsumAmmount=(principle :number, interest: number, time: number)=>{

    return Math.round(principle*Math.pow((1+interest/100), time))

}