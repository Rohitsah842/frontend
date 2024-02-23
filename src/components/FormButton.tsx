import React from 'react'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles';


const FormButton: React.FC<{ title: string, btnType?: 'submit' | 'reset' | 'button' | undefined }> = (props) => {
  const theme = useTheme();
  return (
    <Button variant="contained" type={props.btnType} sx={{
      backgroundColor: theme.palette.text.primary, color: theme.palette.primary.contrastText, ":hover": {
        backgroundColor: theme.palette.text.secondary
      }
    }}>{props.title}</Button>
  )
}

export default FormButton;