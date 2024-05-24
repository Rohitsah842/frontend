'use client'
import React, { useEffect, useState } from 'react'
import { ColumnDefinitionType } from '@/components/CustomTable'
import { lineChartDataType } from '@/types/LineChartData'
import CalculatorComponent from '@/components/CalculatorComponent'
import { InputSliderprops } from '@/types/InputSliderProps'
import { epfCalculation, epfDataType } from '@/utils/epfCal'
import { sliderEventProps } from '@/types/Global'

const EPFCalculator = () => {
    const [initialValue, SetInitialValue] = useState({
        monthly_salary: 10000,
        currentAge: 21,
        contributionPercentage: 12,
        currentEpfBalance: 0,
        interest: 8.1,
        incrementPercentage: 5,
        retirementAge: 35

    })



    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [totalContribution, setTotalContribution] = useState<number>(0);
    const [epfTableData, setEpfTableData] = useState<epfDataType[]>([])
    const [lineChartdata, setLineChartdata] = useState<lineChartDataType[]>([]);
    const [axisData, setAxisData] = useState<number[]>([]);

    const columns: ColumnDefinitionType<epfDataType, keyof epfDataType>[] = [
        {
            key: 'year',
            header: "Year"
        },
        {
            key: 'employeeContribution',
            header: "Employee Contribution (₹)"
        },
        {
            key: 'employerContribution',
            header: "Employer Contribution (₹)"
        },
        {
            key: 'interestEarn',
            header: "Interest Earn (₹)"
        },
        {
            key: 'totalAmount',
            header: "Total Amount (₹)"
        }
    ]

    const donoutChartData = [
        { title: 'Investment Amount', value: (totalContribution) },
        { title: 'Estimated Interest', value: (totalAmount - totalContribution) },
        // { title: 'Total Amount', value: (totalAmount) },
    ]



    useEffect(() => {


        let data = epfCalculation(initialValue.monthly_salary, initialValue.contributionPercentage, initialValue.currentAge, initialValue.retirementAge, initialValue.currentEpfBalance, initialValue.interest, initialValue.incrementPercentage);
        setTotalAmount(data.totalAmountGet);
        setEpfTableData(data.epftableData);
        setLineChartdata(data.epfLineChartData)
        setAxisData(data.asixLabel);
        setTotalContribution(calculateTotalContibution());

    }, [initialValue, totalContribution])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })

    }

    const handlerChangeSlider = ({ name, value }: sliderEventProps) => {
        !!name && SetInitialValue({ ...initialValue, [name]: value })
    }

    const calculateTotalContibution = (): number => {
        let time = initialValue.retirementAge - initialValue.currentAge;
        let totalContribution = 0;
        for (var t = 0; t < time; t++) {
            let basicSalary = initialValue.monthly_salary * Math.pow((1 + (initialValue.incrementPercentage / 100)), t);
            let empolyeeContribution = Math.round(
                (basicSalary * initialValue.contributionPercentage) / 100
            );
            let employerContribution = Math.round(
                basicSalary * 0.0833 <= 1250
                    ? basicSalary * 0.0367
                    : basicSalary * 0.0367 + basicSalary * 0.0833 - 1250
            );
            totalContribution += empolyeeContribution * 12 + employerContribution * 12;
        }

        return Math.round(totalContribution + +initialValue.currentEpfBalance);

    }

    const inputSliderData: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: 'Monthly Salary(Basic+DA)',
            name: 'monthly_salary',
            min: 10000,
            max: 1000000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.monthly_salary
        },
        {
            isStartAdornment: false,
            title: 'Current age',
            name: 'currentAge',
            min: 15,
            max: 60,
            stepSize: 1,
            endormentIcon: 'Yr',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.currentAge
        },
        {
            isStartAdornment: false,
            title: 'Your contribution to EPF',
            name: 'contributionPercentage',
            min: 12,
            max: 20,
            stepSize: 1,
            endormentIcon: '%',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.contributionPercentage
        },
        {
            isStartAdornment: false,
            title: 'Annual salary increment',
            name: 'incrementPercentage',
            min: 0,
            max: 15,
            stepSize: 1,
            endormentIcon: '%',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.incrementPercentage
        },
        {
            isStartAdornment: true,
            title: 'Current EPF Balance',
            name: 'currentEpfBalance',
            min: 0,
            max: 1000000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.currentEpfBalance
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
            name: 'retirementAge',
            min: 15,
            max: 60,
            stepSize: 1,
            endormentIcon: 'Yr.',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.retirementAge,
            title: 'Retirement Age'
        }

    ]

    const totalValueData = [
        {
            title: "Total Contribution",
            value: totalContribution
        },
        {
            title: "Estimated Interest",
            value: (totalAmount - totalContribution - (+initialValue.currentEpfBalance))
        },
        {
            title: "Total Amount",
            value: totalAmount
        }
    ]






    return (
        <CalculatorComponent
            headingTitle="EPF or PF Calculator"
            inputSliderArray={inputSliderData}
            totalValueArray={totalValueData}
            tableData={{ columns: columns, data: epfTableData }}
            donoutChartData={{ chartData: donoutChartData }}
            lineChartData={{ chartData: lineChartdata, axisData: axisData, axisLabel: "Year" }}
        />

    )
}

export default EPFCalculator;