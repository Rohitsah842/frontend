'use client'
import React, { useEffect, useState } from 'react'
import { investmenttypeData } from '@/Assets/constants/investmentType'
import { SelectChangeEvent } from '@mui/material/Select';
import { get } from 'lodash'
import { lineChartDataType } from '@/types/LineChartData'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'
import { ColumnDefinitionType } from '@/components/CustomTable';
import { lumpsumSIPCal, lumpsumSIPTableDataType } from '@/utils/lumpsumSIPCal';

const LumpsumSIPCalculator = () => {
    const [initialValue, SetInitialInvestment] = useState({
        intervalInvestment: 2000,
        oneTimeInvestment: 40000,
        interest: 11,
        time: 5

    })

    const [maturityAmt, setMaturityAmount] = useState<number>(0);
    const [investmentType, setInvestmentType] = useState<string>('monthly')
    const [toalPrinciple, setToalPrinciple] = useState<number>(0)
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([])
    const [lumpsumSIPTableData, setLumpsumSIPTableData] = useState<lumpsumSIPTableDataType[]>([])

    const menuItems = [
        { title: "Montly", value: 'monthly' },
        { title: "Quaterly", value: 'quaterly' },
        { title: "Half-Yearly", value: 'half-yearly' },
        { title: "Yearly", value: 'yearly' }

    ]
    const donoutChartData = [
        { title: 'Principle', value: (toalPrinciple), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Interest', value: (maturityAmt - toalPrinciple) }
    ]
    const columns: ColumnDefinitionType<lumpsumSIPTableDataType, keyof lumpsumSIPTableDataType>[] = [
        {
            key: 'year',
            header: 'Year'
        },
        {
            key: 'investmentAmount',
            header: "Investment Amount"
        },
        {
            key: 'totalInvested',
            header: "Total Investment Amount"
        },
        {
            key: 'interestEarn',
            header: `Yearly Interest Earn (₹)`
        },
        {
            key: 'totalAmount',
            header: "Total Amount (₹)"
        }
    ]

    useEffect(() => {
        const value = lumpsumSIPCal(initialValue.intervalInvestment, initialValue.oneTimeInvestment, initialValue.interest, initialValue.time, get(investmenttypeData, `${investmentType}.noOfPayment`, 0));
        setMaturityAmount(value.totalMaturityAmount);
        setLumpsumSIPTableData(value.lumpsumSIPTableData);
        setLineChartdata(value.lineChartData);
        setAxisData(value.xAxisData);
        setToalPrinciple(initialValue.intervalInvestment * get(investmenttypeData, `${investmentType}.noOfPayment`, 0) * initialValue.time + +initialValue.oneTimeInvestment);

    }, [initialValue, investmentType])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialInvestment({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialInvestment({ ...initialValue, [event.target.name]: event.target.value })
    }

    const handlerChangeSelect = (event: SelectChangeEvent) => {
        setInvestmentType(event.target.value)
    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: get(investmenttypeData, `${investmentType}.title`),
            name: 'intervalInvestment',
            min: 500,
            max: 100000,
            stepSize: 500,
            endormentIcon: '₹',
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.intervalInvestment,
            onChangeHandle: handlerChange,

        },
        {
            isStartAdornment: true,
            title: "Onetime investment amount",
            name: 'oneTimeInvestment',
            min: 5000,
            max: 500000,
            stepSize: 500,
            endormentIcon: '₹',
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.oneTimeInvestment,
            onChangeHandle: handlerChange,

        },
        {
            isStartAdornment: false,
            name: 'interest',
            min: 1,
            max: 30,
            stepSize: 0.1,
            endormentIcon: '%',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.interest,
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
            value: toalPrinciple
        },
        {
            title: "Interest return",
            value: (maturityAmt - toalPrinciple)
        },
        {
            title: "Total Amount",
            value: maturityAmt
        }
    ]




    return (
        <CalculatorComponent
            headingTitle="SIP Calculators"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: lumpsumSIPTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
            isDropDown={true}
            dropDown={{ value: investmentType, onChangeHandler: handlerChangeSelect, menuItems: menuItems }}
        />
    )
}

export default LumpsumSIPCalculator