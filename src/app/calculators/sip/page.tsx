'use client'
import React, { useEffect, useState } from 'react'
import { SIPTableDataType, sipInterestAmt } from '@/utils/sipInterestCal'
import { investmenttypeData } from '@/Assets/constants/investmentType'
import { SelectChangeEvent } from '@mui/material/Select';
import { get } from 'lodash'
import { lumpsumAmmount } from '@/utils/lumpSumCal'
import { sipLineChartDataCal } from '@/utils/sipLineChartDataCal'
import { lineChartDataType } from '@/types/LineChartData'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'
import { ColumnDefinitionType } from '@/components/CustomTable';
import { sliderEventProps } from '@/types/Global';

const SIPCalculator = () => {
    const [initialInvestment, SetInitialInvestment] = useState({
        amount: 5000,
        interest: 12,
        time: 5

    })

    const [maturityAmt, setMaturityAmount] = useState<number>(0);
    const [investmentType, setInvestmentType] = useState<string>('monthly')
    const [toalPrinciple, setToalPrinciple] = useState<number>(0)
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([])
    const [SIPTableData, setSIPTableData] = useState<SIPTableDataType[]>([])

    const menuItems = [
        { title: "Montly", value: 'monthly' },
        { title: "Quaterly", value: 'quaterly' },
        { title: "Half-Yearly", value: 'half-yearly' },
        { title: "Yearly", value: 'yearly' },
        { title: "Lump sum", value: 'lumpsum' }

    ]
    const donoutChartData = [
        { title: 'Principle', value: (toalPrinciple), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Interest', value: (maturityAmt - toalPrinciple) }
    ]
    const columns: ColumnDefinitionType<SIPTableDataType, keyof SIPTableDataType>[] = [
        {
            key: 'year',
            header: get(investmenttypeData, `${investmentType}.name`, "")
        },
        {
            key: 'investmentAmount',
            header: (get(investmenttypeData, `${investmentType}.type`) === 'SIP') ? "Investment Amount" : "Principle Amount"
        },
        {
            key: 'interestEarn',
            header: `${get(investmenttypeData, `${investmentType}.name`, "")} Interest Earn (₹)`
        },
        {
            key: 'totalAmount',
            header: "Total Amount (₹)"
        }
    ]

    useEffect(() => {
        if (get(investmenttypeData, `${investmentType}.type`) === 'SIP') {
            setMaturityAmount(sipInterestAmt(initialInvestment.amount, initialInvestment.interest, initialInvestment.time, get(investmenttypeData, `${investmentType}.noOfPayment`, 0)).SIPTotalValue);
            setSIPTableData(sipInterestAmt(initialInvestment.amount, initialInvestment.interest, initialInvestment.time, get(investmenttypeData, `${investmentType}.noOfPayment`, 0)).SIPTableData);
            setToalPrinciple(initialInvestment.amount * initialInvestment.time * get(investmenttypeData, `${investmentType}.noOfPayment`, 0))

        } else {
            setMaturityAmount(lumpsumAmmount(initialInvestment.amount, initialInvestment.interest, initialInvestment.time).totalValue);
            setSIPTableData(lumpsumAmmount(initialInvestment.amount, initialInvestment.interest, initialInvestment.time).lumpsumData);
            setToalPrinciple(initialInvestment.amount * get(investmenttypeData, `${investmentType}.noOfPayment`, 0))
        }

        const lineData = sipLineChartDataCal(initialInvestment.amount, initialInvestment.interest, get(investmenttypeData, `${investmentType}.noOfPayment`, 0), initialInvestment.time, get(investmenttypeData, `${investmentType}.type`));
        setLineChartdata(lineData.lineChartData);
        setAxisData(lineData.xAxisData);



    }, [initialInvestment, investmentType])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialInvestment({ ...initialInvestment, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = ({ name, value }: sliderEventProps) => {
        !!name && SetInitialInvestment({ ...initialInvestment, [name]: value })
    }

    const handlerChangeSelect = (event: SelectChangeEvent) => {
        setInvestmentType(event.target.value)
    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: get(investmenttypeData, `${investmentType}.title`),
            name: 'amount',
            min: 500,
            max: 10000000,
            stepSize: 50,
            endormentIcon: '₹',
            onChangeSliderHandler: handlerChangeSlider,
            value: initialInvestment.amount,
            onChangeHandle: handlerChange,

        },
        {
            isStartAdornment: false,
            name: 'interest',
            min: 1,
            max: 50,
            stepSize: 0.1,
            endormentIcon: '%',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialInvestment.interest,
            isSliderHide: true,
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
            value: initialInvestment.time,
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
            tableData={{ columns: columns, data: SIPTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
            isDropDown={true}
            dropDown={{ value: investmentType, onChangeHandler: handlerChangeSelect, menuItems: menuItems }}
        />
    )
}

export default SIPCalculator