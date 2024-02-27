
export const sipInterestAmt=(p: number, interest: number, t: number, n:number): number=>{

    const i= interest/(n*100);
    return Math.round(p* ((Math.pow((1 + i), (t*n))-1)/ i) * (1 + i));
    
    
 

}
