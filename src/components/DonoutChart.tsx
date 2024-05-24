import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Paper from '@mui/material/Paper'

export interface donoutChartDataType {
    chartData: {
        title: string,
        value: number,
        color?: string
    }[]
}

const DonoutChart = (props: donoutChartDataType) => {
    const data = props.chartData.map((data) => {
        return { label: data.title, value: data.value }
    })
    // { label: props.title1, value: props.initialAmt, color: 'rgba(184, 0, 216, 1)' },
    // { label: 'Interest', value: (props.totalAmount - props.initialAmt), color: 'rgba(96, 0, 155, 1)' },
    // // { label: props.title2, value: props.totalAmount }


    return (
        <Paper elevation={1} sx={{ width: { xs: '100%', md: '39%' }, display: 'flex', alignItems: 'center' }} >
            <PieChart
                series={[
                    {
                        innerRadius: 70,
                        outerRadius: 110,
                        data: data,
                        paddingAngle: 2,
                    },

                ]}
                height={350}
                margin={{ left: 100, top: -70 }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 10,
                        hidden: false,

                    },
                }}

            />
        </Paper>
    )
}

export default DonoutChart