import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const DonoutChart: React.FC<{ principalAmt: number, totalAmount: number }> = (props) => {
    const data = [
        { label: 'Principal', value: props.principalAmt },
        { label: 'Interest', value: (props.totalAmount - props.principalAmt) },
        { label: 'Maturity', value: props.totalAmount }
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