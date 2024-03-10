import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const DonoutChart: React.FC<{ initialAmt: number, totalAmount: number, title1: string, title2: string }> = (props) => {
    const data = [
        { label: props.title1, value: props.initialAmt, color: 'rgba(184, 0, 216, 1)' },
        { label: 'Interest', value: (props.totalAmount - props.initialAmt), color: 'rgba(96, 0, 155, 1)' },
        // { label: props.title2, value: props.totalAmount }
    ]

    return (
        <PieChart
            series={[
                {
                    innerRadius: 50,
                    outerRadius: 80,
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
    )
}

export default DonoutChart