export const lumpsumAmmount=(p :number, i: number, t: number)=>{

    return Math.round(p*Math.pow((1+i/100), t))

}