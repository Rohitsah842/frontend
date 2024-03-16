'use client'
import React, { useEffect, useState } from 'react'
import { monthlyEMI } from '@/utils/loanEMICal'
import { loanEMIData } from '@/utils/loanEMIdata'
import { EMITableDataType } from '@/utils/loanEMIdata'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'

const PersonalLoanEMI = () => {
    const [initialValue, SetInitialValue] = useState({
        Loan_amount: 80000,
        interest: 11,
        time: 3

    })

    const [monthlyPayment, setmonthlyPayment] = useState<number>(0);
    const [EMITableData, setEMITableData] = useState<EMITableDataType[]>([])
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([]);

    const columns: ColumnDefinitionType<EMITableDataType, keyof EMITableDataType>[] = [
        {
            key: 'month',
            header: "Month"
        },
        {
            key: 'openingBalance',
            header: "Loan Amount (₹)"
        },
        {
            key: 'EMI',
            header: "Monthly EMI (₹)"
        },
        {
            key: 'monthlyInterestPaid',
            header: "Monthly Interest Paid (₹)"
        },
        {
            key: 'monthlyPrinciplePaid',
            header: "Monthly Principle Paid (₹)"
        },
        {
            key: 'closingBalance',
            header: "Remaining Loan Amount(₹)"
        }
    ]

    const donoutChartData = [
        { title: 'Total Amount', value: (monthlyPayment * EMITableData.length), color: 'rgba(184, 0, 216, 1)' },
        { title: 'Interest Paid', value: ((monthlyPayment * EMITableData.length) - initialValue.Loan_amount) },
        { title: 'Loan Amount', value: (initialValue.Loan_amount) },
    ]



    useEffect(() => {

        setmonthlyPayment(monthlyEMI(initialValue.Loan_amount, initialValue.interest, initialValue.time));
        let data = loanEMIData(initialValue.Loan_amount, initialValue.interest, initialValue.time);

        setEMITableData(data.EMIdata);
        setLineChartdata(data.EMIChartData)
        setAxisData(data.axisData);

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
            name: 'Loan_amount',
            min: 10000,
            max: 5000000,
            stepSize: 100,
            title: 'Amount you need',
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.Loan_amount
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
            title: "Monthly Loan EMI",
            value: monthlyPayment
        },
        {
            title: "Loan Amount",
            value: initialValue.Loan_amount
        },
        {
            title: "Interest Amount",
            value: (monthlyPayment * initialValue.time * 12 - initialValue.Loan_amount)
        },
        {
            title: "Total Amount",
            value: monthlyPayment * initialValue.time * 12
        }
    ]


    return (
        <CalculatorComponent
            headingTitle="Personal Loan EMI Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: EMITableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
        />

    )
}

export default PersonalLoanEMI;