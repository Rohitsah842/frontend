
export interface FormInput{
    inputType?:string
    placeholder?: string
    title:string
    value?:string
    onChangeHandler?:()=>void
    endAdornment?:React.ReactNode
    inputName: string;
    touch?:boolean
    errorMessage?: string

}