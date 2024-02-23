import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface PageLink{
    title: string
    path: string
    onClickHandler?: ()=> void
    icon?: JSX.Element
    onMouseMoveHandler?: (event:React.MouseEvent<HTMLElement>)=>void
    onMouseOutHandler?: (event:React.MouseEvent<HTMLElement>)=>void
}