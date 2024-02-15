import React from 'react'

import Link from 'next/link'

import { useTheme } from '@mui/material/styles';

const AnchorLink: React.FC<{ path: string, title: string, color?: string }> = (props) => {
  const theme = useTheme();
  return (
    <Link href={props.path}
      style={{ color: `${!!props.color ? props.color : theme.palette.text.secondary}`, textDecoration: "none" }}
    >{props.title}</Link>
  )
}

export default AnchorLink