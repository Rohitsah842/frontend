
export interface InputSliderprops{
    min:number,
    max:number,
    stepSize:number
    value: number
    onChangeHandle:(event:React.ChangeEvent<HTMLInputElement>)=>void
    onChangeSliderHandler?: (event: React.ChangeEvent<HTMLInputElement>)=> void
    endormentType?:string 
    endormentIcon?: string
    name:string
    title?: string
}