
export const monthlyEMI=(loan: number, rate: number, t:number): number=>{
    let r=rate/(12*100);

    return Math.round((loan*r*Math.pow((1+r), 12*t))/(Math.pow((1+r), 12*t)-1));

}