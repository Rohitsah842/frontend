'use client'
import React, { useEffect, useState } from 'react'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import { sipLineChartDataCal } from '@/utils/sipLineChartDataCal'
import { InputSliderprops } from '@/types/InputSliderProps'
import CalculatorComponent from '@/components/CalculatorComponent'
import { SIPTableDataType, sipInterestAmt } from '@/utils/sipInterestCal'
import { sliderEventProps } from '@/types/Global'

const RecurringDeposit = () => {
    const [initialValue, SetInitialValue] = useState({
        investment_amount: 5000,
        interest: 7,
        time: 3

    })

    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [recurringDepositTableData, setRecurringDepositTableData] = useState<SIPTableDataType[]>([])
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([]);

    const columns: ColumnDefinitionType<SIPTableDataType, keyof SIPTableDataType>[] = [
        {
            key: 'year',
            header: "Month"
        },
        {
            key: 'investmentAmount',
            header: "Principle Amount"
        },
        {
            key: 'interestEarn',
            header: "Yearly Interest Earn (₹)"
        },
        {
            key: 'totalAmount',
            header: "Total Amount (₹)"
        }
    ]

    const donoutChartData = [
        { title: 'Investment Amount', value: (initialValue.investment_amount * initialValue.time * 12), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Estimated Interest', value: (totalAmount - initialValue.investment_amount * initialValue.time * 12) },
        // { title: 'Total Amount', value: (totalAmount) },
    ]



    useEffect(() => {

        let data = sipInterestAmt(initialValue.investment_amount, initialValue.interest, initialValue.time, 12);
        setTotalAmount(data.SIPTotalValue);
        setRecurringDepositTableData(data.SIPTableData);

        let chartData = sipLineChartDataCal(initialValue.investment_amount, initialValue.interest, 12, initialValue.time, "SIP");

        setLineChartdata(chartData.lineChartData)
        setAxisData(chartData.xAxisData);

    }, [initialValue])


    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })

    }

    const handlerChangeSlider = ({ name, value }: sliderEventProps) => {
        !!name && SetInitialValue({ ...initialValue, [name]: value })
    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: 'Monthly investment',
            name: 'investment_amount',
            min: 1000,
            max: 50000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.investment_amount,
        },
        {
            isStartAdornment: false,
            name: 'interest',
            min: 1,
            max: 15,
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
            title: "Invested Amount",
            value: initialValue.investment_amount * initialValue.time * 12
        },
        {
            title: "Interest Amount",
            value: (totalAmount - initialValue.investment_amount * initialValue.time * 12)
        },
        {
            title: "Total Amount",
            value: totalAmount
        }
    ]





    return (
        <CalculatorComponent
            headingTitle="Recurring Deposit Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: recurringDepositTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
        />
    )
}

export default RecurringDeposit;