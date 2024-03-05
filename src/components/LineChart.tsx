import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { lineChartType } from '@/types/LineChartprops';

const LineChartGraph = (props: lineChartType) => {
    return (
        <LineChart

            sx={{ width: '100%' }}
            height={500}
            series={
                props.dataValue
            }
            xAxis={[{ scaleType: 'point', data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', "24"] }]}
        />
    )
}

export default LineChartGraph