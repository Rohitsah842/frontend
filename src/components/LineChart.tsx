import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { lineChartType } from '@/types/LineChartprops';
import Paper from '@mui/material/Paper'

const LineChartGraph = (props: lineChartType) => {
    return (
        <Paper elevation={3} sx={{ width: '100%', height: '100%' }}>
            <LineChart

                sx={{ width: '100%' }}
                height={500}
                margin={{ left: 80 }}
                series={
                    props.dataValue
                }
                xAxis={[{ scaleType: 'point', data: props.axisLabel }]}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: -5,
                        hidden: false,

                    },
                }}
            />
        </Paper>
    )
}

export default LineChartGraph