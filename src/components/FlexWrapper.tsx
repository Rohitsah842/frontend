import React from 'react'
interface props {
  children: React.ReactNode
}

const FlexWrapper = (props: props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem' }}>{props.children}</div>
  )
}

export default FlexWrapper