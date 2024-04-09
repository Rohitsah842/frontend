import React from 'react'
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <Typography variant='body1'
            sx={{ display: 'flex', justifyContent: "center", alignItems: "center", zIndex: 100, height: '100%', width: '100%' }}>
            <CircularProgress />
        </Typography>
    )
}

export default Loading