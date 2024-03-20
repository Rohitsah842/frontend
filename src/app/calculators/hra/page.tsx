'use client'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Paper, Stack, Box } from "@mui/material"
import InputSlider from '@/components//InputSlider';
import FlexWrapper from '@/components/FlexWrapper';
import DonoutChart from '@/components//DonoutChart';
import { dollarIndianLocale } from '@/Assets/constants';
import RadioField from '@/components/RadioField';
import { InputSliderprops } from '@/types/InputSliderProps';
import { hraCalculate } from '@/utils/hraCalculate';

const HRACalculator = () => {
    const [initialValue, SetInitialValue] = useState({
        basicSalary: 200000,
        daAmount: 0,
        HRARecived: 70000,
        rentPaid: 80000,
        isMetroCity: "No"
    })



    const [exemptedHRA, setExemptedHRA] = useState<number>(0);
    const [taxableHRA, setTaxableHRA] = useState<number>(0);


    const donoutChartData = [
        { title: 'Exempted HRA ', value: (exemptedHRA) },
        { title: 'Taxable HRA', value: (taxableHRA) },
    ]



    useEffect(() => {
        const value = hraCalculate(initialValue.basicSalary, initialValue.daAmount, initialValue.HRARecived, initialValue.rentPaid, initialValue.isMetroCity);
        setExemptedHRA(value);
        setTaxableHRA(+initialValue.HRARecived > value ? (+initialValue.HRARecived - value) : 0);
    }, [initialValue])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialValue({ ...initialValue, [event.target.name]: event.target.value })
    }


    const inputSliderArray: InputSliderprops[] = [
        {
            isStartAdornment: true,
            title: 'Basic Salary(p.a)',
            name: 'basicSalary',
            min: 100000,
            max: 2000000,
            stepSize: 1000,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.basicSalary
        },
        {
            isStartAdornment: true,
            title: 'Dearness Allowance (DA)',
            name: 'daAmount',
            min: 0,
            max: 100000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.daAmount
        },
        {
            isStartAdornment: true,
            title: 'HRA Recevied (p.a)',
            name: 'HRARecived',
            min: 10000,
            max: 500000,
            stepSize: 500,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.HRARecived
        },
        {
            isStartAdornment: true,
            title: 'Total Rent paid (p.a)',
            name: 'rentPaid',
            min: 10000,
            max: 500000,
            stepSize: 100,
            endormentIcon: '₹',
            onChangeHandle: handlerChange,
            onChangeSliderHandler: handlerChangeSlider,
            value: initialValue.rentPaid
        }

    ]

    const radioFieldArray = [
        { label: "Yes", value: "Yes", name: "isMetroCity" },
        { label: "No", value: "No", name: "isMetroCity" }
    ]

    const totalValueData = [
        {
            title: "Exempted HRA",
            value: exemptedHRA
        },
        {
            title: "Taxable HRA",
            value: (taxableHRA)
        },
    ]






    return (
        <Container maxWidth='xl' sx={{ height: 'calc(100vh - 65px)', padding: '1rem' }}>
            <Box sx={{ lg: { m: "10px" }, height: '100vh' }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" color="inherit" >HRA Calculator</Typography>
                </Stack >
                <Grid container rowSpacing={2} columnSpacing={0} sx={{ m: '0', maxWidth: "100%" }}>
                    <Grid item xs={12} md={12} sx={{ display: { xs: 'block', md: 'flex' } }}>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '60%' } }}>
                            <Stack spacing={4}>
                                {inputSliderArray.map((filedValue, i) => {
                                    return <InputSlider key={i} isStartAdornment={filedValue.isStartAdornment}
                                        title={filedValue.title}
                                        name={filedValue.name}
                                        min={filedValue.min}
                                        max={filedValue.max}
                                        stepSize={filedValue.stepSize}
                                        endormentIcon={filedValue.endormentIcon}
                                        onChangeHandle={filedValue.onChangeHandle}
                                        onChangeSliderHandler={filedValue.onChangeSliderHandler}
                                        isDisable={filedValue.isDisable}
                                        isSliderHide={filedValue.isSliderHide}
                                        value={filedValue.value} />
                                })}
                                <RadioField
                                    formLabel='Do you live in Delhi, Mumbai, Kolkata or Chennai?'
                                    value={initialValue.isMetroCity}
                                    onchangeHandle={handlerChange}
                                    fieldArray={radioFieldArray}
                                />
                            </Stack>
                        </Paper>
                        <DonoutChart chartData={donoutChartData} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <Stack spacing={4}>
                                {totalValueData.map((value, i) => {
                                    return (<FlexWrapper key={i}>
                                        <Typography variant='body1' color="inherit" ><b>{value.title} </b></Typography>
                                        <Typography variant="body1" color="inherit" ><b> ₹ {dollarIndianLocale.format(value.value)} </b></Typography>
                                    </FlexWrapper>)
                                })}

                            </Stack>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
        </Container>

    )
}

export default HRACalculator;