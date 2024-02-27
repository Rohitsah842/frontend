import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const DonoutChart: React.FC<{ principalAmt: number, totalAmount: number }> = (props) => {
    const data = [
        { label: 'Principal Amount', value: props.principalAmt },
        { label: 'Interest Amount', value: (props.totalAmount - props.principalAmt) },
        { label: 'Maturity Amount', value: props.totalAmount }
    ]

    return (
        <PieChart
            series={[
                {
                    innerRadius: 50,
                    outerRadius: 80,
                    data: data,
                    paddingAngle: 2
                },
            ]}
            height={400}
            margin={{ left: 70, top: 80 }}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'middle' },
                    padding: 10,
                    hidden: false,

                },
            }}

        />
    )
}

export default DonoutChart