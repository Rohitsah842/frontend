
import React from 'react'
import Grid from '@mui/material/Grid';
import { calculatorsLinks } from '@/Assets/constants';
import CalculatorCard from '@/components/CalculatorCard';



const Calculators = () => {
    return (
        <Grid container spacing={3} p={4}>
            {calculatorsLinks.map((link, i) => {
                return <CalculatorCard key={i} title={link.title} path={link.path} bodyText={link.bodyText} imgSrc={link.imgSrc} />
            })}

        </Grid>
    )
}

export default Calculators