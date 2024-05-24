'use client'
import React, { useEffect, useState } from 'react'
import { SWPCalculation, SwpTableDataType } from '@/utils/swpCal'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'
import { sliderEventProps } from '@/types/Global'



const SWPCalculator = () => {

    const [initialValue, SetInitialInvestment] =
        useState({
            investment_amount: 50000,
            withdraw_amount: 2000,
            interest: 8,
            time: 3

        })

    const [swpTableData, setSwpTableData] = useState<SwpTableDataType[]>([]);
    const [toalinterestEarn, setToalinterestEarn] = useState<number>(0)
    const [finalValue, setFinalValue] = useState<number>(0);
    const [axisLabel, setAxisLabel] = useState<number[]>([]);
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const columns: ColumnDefinitionType<SwpTableDataType, keyof SwpTableDataType>[] = [
        {
            key: "month",
            header: "Month"
        },
        {
            key: 'balanceAtBegin',
            header: "Balance at Begin (₹)"
        },
        {
            key: 'withdraw',
            header: "Withdrawal (₹)"
        },
        {
            key: 'interestEarn',
            header: "Interest Earned (₹)"
        },
        {
            key: 'remainingBalance',
            header: "Balance at End (₹)"
        }
    ]

    const donoutChartData = [
        { title: 'Total Withdrawal', value: (initialValue.withdraw_amount * swpTableData.length), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Interest Earn', value: (toalinterestEarn) },
        { title: 'Final Value', value: (finalValue) }
    ]


    useEffect(() => {

        const data = SWPCalculation(initialValue.investment_amount, initialValue.withdraw_amount, initialValue.interest, initialValue.time)
        setSwpTableData(data.swpData);
        setLineChartdata(data.lineChartData)
        setAxisLabel(data.axisLabel);
        setToalinterestEarn(calculateTotalInterestEarn(data.swpData));


    }, [initialValue])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialInvestment({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = ({ name, value }: sliderEventProps) => {
        !!name && SetInitialInvestment({ ...initialValue, [name]: value })
    }

    const calculateTotalInterestEarn = (swpData: SwpTableDataType[]): number => {
        let totalInterest = swpData.reduce((sum, data) => {
            return sum + data.interestEarn;
        }, 0)
        let len = swpData.length
        setFinalValue(swpData[len - 1].remainingBalance);
        return totalInterest;
    }
    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            name: 'investment_amount',
            min: 10000,
            max: 5000000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.investment_amount,
            title: 'Total investment'
        },
        {
            isStartAdornment: true,
            title: 'Withdrawal per month',
            name: 'withdraw_amount',
            min: 500,
            max: 50000,
            stepSize: 50,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.withdraw_amount,
        },
        {
            isStartAdornment: false,
            name: 'interest',
            min: 1,
            max: 30,
            stepSize: 0.1,
            endormentIcon: '%',
            value: initialValue.interest,
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            title: 'Interest rate (% PA)'
        },
        {
            isStartAdornment: false,
            name: 'time',
            min: 1,
            max: 40,
            stepSize: 1,
            endormentIcon: 'Yr.',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.time,
            title: 'Time Period'
        }

    ]

    const totalValueData = [
        {
            title: "Total investment",
            value: initialValue.investment_amount
        },
        {
            title: "Total withdrawal",
            value: (initialValue.withdraw_amount * swpTableData.length)
        },
        {
            title: "No of installment withdraw",
            value: (swpTableData.length),
            isShow: true
        },
        {
            title: "Total Interest Earned",
            value: toalinterestEarn
        },
        {
            title: "Final Amount",
            value: finalValue
        }
    ]





    return (
        <CalculatorComponent
            headingTitle="SWP(Systematic Withdrawal Plan) Calculators"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: swpTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisLabel, axisLabel: "Month" }}
        />
    )
}

export default SWPCalculator