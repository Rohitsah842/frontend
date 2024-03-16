'use client'
import React, { useEffect, useState } from 'react'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import { sipLineChartDataCal } from '@/utils/sipLineChartDataCal'
import { SIPTableDataType, sipInterestAmt } from '@/utils/sipInterestCal'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'

const PPFCalculator = () => {
    const [initialValue, SetInitialValue] = useState({
        yearly_investment: 10000,
        interest: 7.1,
        time: 15

    })

    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [ppfTableData, setPpfTableData] = useState<SIPTableDataType[]>([])
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([]);

    const columns: ColumnDefinitionType<SIPTableDataType, keyof SIPTableDataType>[] = [
        {
            key: 'year',
            header: "Year"
        },
        {
            key: 'investmentAmount',
            header: "Investment Amount"
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
        { title: 'Investment Amount', value: (initialValue.yearly_investment) },
        { title: 'Estimated Interest', value: (totalAmount - initialValue.yearly_investment) },
        // { title: 'Total Amount', value: (totalAmount) },
    ]



    useEffect(() => {


        let data = sipInterestAmt(initialValue.yearly_investment, initialValue.interest, initialValue.time, 1);
        setTotalAmount(data.SIPTotalValue);
        setPpfTableData(data.SIPTableData);

        let chartData = sipLineChartDataCal(initialValue.yearly_investment, initialValue.interest, 1, "SIP");

        setLineChartdata(chartData.lineChartData)
        setAxisData(chartData.xAxisData);

    }, [initialValue])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })

    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialValue({ ...initialValue, [event.target.name]: event.target.value })
    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: 'Yearly investment',
            name: 'yearly_investment',
            min: 10000,
            max: 5000000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.yearly_investment
        },
        {
            isStartAdornment: false,
            name: 'interest',
            min: 1,
            max: 30,
            stepSize: 0.1,
            endormentIcon: '%',
            isDisable: true,
            value: initialValue.interest,
            isSliderHide: true,
            title: 'Interest rate (% PA)'
        },
        {
            isStartAdornment: false,
            name: 'time',
            min: 15,
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
            value: initialValue.yearly_investment * initialValue.time
        },
        {
            title: "Estimated Interest",
            value: (totalAmount - (initialValue.yearly_investment * initialValue.time))
        },
        {
            title: "Total Amount",
            value: totalAmount
        }
    ]






    return (
        <CalculatorComponent
            headingTitle="PPF Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: ppfTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
        />

    )
}

export default PPFCalculator;