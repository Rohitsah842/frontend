'use client'
import React, { useEffect, useState } from 'react'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import { lumpsumAmmount, lumpsumTableDataType } from '@/utils/lumpSumCal'
import { sipLineChartDataCal } from '@/utils/sipLineChartDataCal'
import { InputSliderprops } from '@/types/InputSliderProps'
import CalculatorComponent from '@/components/CalculatorComponent'
import { sliderEventProps } from '@/types/Global'

const FixedDeposit = () => {
    const [initialValue, SetInitialValue] = useState({
        investment_amount: 10000,
        interest: 7,
        time: 3

    })


    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [fixedDepositTableData, setfixedDepositTableData] = useState<lumpsumTableDataType[]>([])
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([]);

    const columns: ColumnDefinitionType<lumpsumTableDataType, keyof lumpsumTableDataType>[] = [
        {
            key: 'year',
            header: "Year"
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
        { title: 'Investment Amount', value: (initialValue.investment_amount), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Estimated Interest', value: (totalAmount - initialValue.investment_amount) },
        // { title: 'Total Amount', value: (totalAmount) },
    ]



    useEffect(() => {

        let data = lumpsumAmmount(initialValue.investment_amount, initialValue.interest, initialValue.time);
        setTotalAmount(data.totalValue);
        setfixedDepositTableData(data.lumpsumData);

        let chartData = sipLineChartDataCal(initialValue.investment_amount, initialValue.interest, 1, initialValue.time, "Lumpsum");

        setLineChartdata(chartData.lineChartData)
        setAxisData(chartData.xAxisData);

    }, [initialValue])

    console.log(fixedDepositTableData);


    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })

    }

    const handlerChangeSlider = ({ name, value }: sliderEventProps) => {
        !!name && SetInitialValue({ ...initialValue, [name]: value })
    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: 'Total investment',
            name: 'investment_amount',
            min: 10000,
            max: 1000000,
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
            max: 50,
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
            value: initialValue.investment_amount
        },
        {
            title: "Interest Amount",
            value: (totalAmount - initialValue.investment_amount)
        },
        {
            title: "Total Amount",
            value: totalAmount
        }
    ]





    return (
        <CalculatorComponent
            headingTitle="Fixed-deposit Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: fixedDepositTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
        />
    )
}

export default FixedDeposit;