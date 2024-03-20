'use client'
import React, { useEffect, useState } from 'react'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import { sipLineChartDataCal } from '@/utils/sipLineChartDataCal'
import { InputSliderprops } from '@/types/InputSliderProps'
import CalculatorComponent from '@/components/CalculatorComponent'
import { SIPTableDataType, sipInterestAmt } from '@/utils/sipInterestCal'

const NationalPensionScheme = () => {
    const [initialValue, SetInitialValue] = useState({
        investment_amount: 5000,
        interest: 9,
        currentAge: 25,
        investmentTillAge: 60,
        annuityPercentage: 40,

    })

    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [nationalPensionTableData, setNationalPensionTableData] = useState<SIPTableDataType[]>([])
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
        { title: 'Investment Amount', value: (initialValue.investment_amount * (+initialValue.investmentTillAge - +initialValue.currentAge) * 12), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Estimated Interest', value: (totalAmount - initialValue.investment_amount * (+initialValue.investmentTillAge - +initialValue.currentAge) * 12) },
        { title: 'Annuity Amount', value: (totalAmount * initialValue.annuityPercentage / 100) },
        { title: 'Lumpsum Amount', value: (totalAmount - (totalAmount * initialValue.annuityPercentage / 100)) },

    ]



    useEffect(() => {

        let data = sipInterestAmt(initialValue.investment_amount, initialValue.interest, (+initialValue.investmentTillAge - +initialValue.currentAge), 12);
        setTotalAmount(data.SIPTotalValue);
        setNationalPensionTableData(data.SIPTableData);

        let chartData = sipLineChartDataCal(initialValue.investment_amount, initialValue.interest, 12, "SIP");

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
            title: 'Monthly investment',
            name: 'investment_amount',
            min: 500,
            max: 50000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.investment_amount,
        },
        {
            isStartAdornment: false,
            name: 'currentAge',
            min: 1,
            max: 60,
            stepSize: 1,
            endormentIcon: 'Yr.',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.currentAge,
            title: 'Your current age '
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
            name: 'investmentTillAge',
            min: 60,
            max: 70,
            stepSize: 1,
            endormentIcon: 'Yr.',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.investmentTillAge,
            title: 'Contribute till the age '
        },
        {
            isStartAdornment: false,
            name: 'annuityPercentage',
            min: 40,
            max: 100,
            stepSize: 1,
            endormentIcon: '%',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.annuityPercentage,
            title: 'Percentage of annuity'
        }

    ]

    const totalValueData = [
        {
            title: "Invested Amount",
            value: initialValue.investment_amount * (+initialValue.investmentTillAge - +initialValue.currentAge) * 12
        },
        {
            title: "Interest Amount",
            value: (totalAmount - initialValue.investment_amount * (+initialValue.investmentTillAge - +initialValue.currentAge) * 12)
        },
        {
            title: "Total Amount",
            value: totalAmount
        },
        {
            title: "Min. annuity Amount",
            value: Math.round(totalAmount * initialValue.annuityPercentage / 100)
        }
    ]





    return (
        <CalculatorComponent
            headingTitle="National Pension Scheme Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: nationalPensionTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
        />
    )
}

export default NationalPensionScheme;