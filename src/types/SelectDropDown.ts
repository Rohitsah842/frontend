import  { SelectChangeEvent } from '@mui/material/Select';

export interface dropDownTypes{
    value: string
    onChangeHandler: (event: SelectChangeEvent)=>void
    menuItems:{title:string, value:string | number }[]

}