
export interface FormInput{
    inputType?:string
    placeholder?: string
    title:string
    value?:string
    onChangeHandler?:(event: React.ChangeEvent<HTMLInputElement>)=>void
    endAdornment?:React.ReactNode
    inputName: string;
    touch?:boolean
    errorMessage?: string

}