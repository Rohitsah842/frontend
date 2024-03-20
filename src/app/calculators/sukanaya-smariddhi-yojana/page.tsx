'use client'
import React, { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material/Select';

import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'
import { investmenttypeData } from '@/Assets/constants/investmentType'
import { get } from 'lodash'
import { sukanyaSamriddhiYojanaCal, sukanyaTableDataType } from '@/utils/sukanyaSamriddhiCal';

const SukanyaSamriddhiYojna = () => {

    const menuItems = [
        { title: "Montly", value: 'monthly' },
        { title: "Quaterly", value: 'quaterly' },
        { title: "Half-Yearly", value: 'half-yearly' },
        { title: "Yearly", value: 'yearly' },

    ]


    const [initialValue, SetInitialValue] = useState({
        depositAmount: 10000,
        interest: 8.2,
        time: 2024

    })
    const [totalinvested, setTotalInvested] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [investmentType, setInvestmentType] = useState<string>('monthly')
    const [sukanyaTableData, setSukanyaTableData] = useState<sukanyaTableDataType[]>([])
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([]);

    const columns: ColumnDefinitionType<sukanyaTableDataType, keyof sukanyaTableDataType>[] = [
        {
            key: 'year',
            header: get(investmenttypeData, `${investmentType}.name`, "")
        },
        {
            key: 'investedAmount',
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
        { title: 'Investment Amount', value: (totalinvested) },
        { title: 'Estimated Interest', value: (totalAmount - totalinvested) },
        // { title: 'Total Amount', value: (totalAmount) },
    ]



    useEffect(() => {


        let data = sukanyaSamriddhiYojanaCal(initialValue.depositAmount, initialValue.interest, initialValue.time, get(investmenttypeData, `${investmentType}.noOfPayment`, 0));

        setTotalInvested(data.totalInvested);
        setTotalAmount(data.totalAmountAcumulated);
        setSukanyaTableData(data.sukanyatableData);
        setLineChartdata(data.sukanyaLineChartData)
        setAxisData(data.axisLabel);

    }, [initialValue, investmentType])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })

    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialValue({ ...initialValue, [event.target.name]: event.target.value })
    }
    const handlerChangeSelect = (event: SelectChangeEvent) => {
        setInvestmentType(event.target.value)
    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: get(investmenttypeData, `${investmentType}.title`),
            name: 'depositAmount',
            min: 1000,
            max: 50000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.depositAmount
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
            min: 2016,
            max: 2040,
            stepSize: 1,
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.time,
            title: 'Start period'
        }

    ]

    const totalValueData = [
        {
            title: "Total investment amount",
            value: totalinvested
        },
        {
            title: "Estimated Interest",
            value: (totalAmount - totalinvested)
        },
        {
            title: "Maturity year",
            value: (+initialValue.time + 21),
            isShow: true
        },
        {
            title: "Maturity Amount",
            value: totalAmount
        }
    ]






    return (
        <CalculatorComponent
            headingTitle="Sukanya Samriddhi Yojana Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: sukanyaTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
            isDropDown={true}
            dropDown={{ value: investmentType, onChangeHandler: handlerChangeSelect, menuItems: menuItems }}

        />

    )
}

export default SukanyaSamriddhiYojna;