'use client'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Paper, Stack, Box } from "@mui/material"
import InputSlider from '@/components/InputSlider'
import DonoutChart from '@/components/DonoutChart'
import FlexWrapper from '@/components/FlexWrapper'
// import LineChartGraph from '@/components/LineChart'
import { monthlyEMI } from '@/utils/loanEMICal'
import { loanEMIData } from '@/utils/loanEMIdata'
import { EMITableDataType } from '@/utils/loanEMIdata'
import CustomTable, { ColumnDefinitionType } from '@/components/CustomTable'

const LoanEMICalculator = () => {
    const [initialValue, SetInitialValue] = useState({
        Loan_amount: 50000,
        interest: 12,
        time: 3

    })

    const [monthlyPayment, setmonthlyPayment] = useState<number>(0);
    const [EMITableData, setEMITableData] = useState<EMITableDataType[]>([])
    // const [lineChartdata, setLineChartdata] = useState<Array<{ showMark: boolean, data: number[], label: string }>>([]);

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



    useEffect(() => {

        setmonthlyPayment(monthlyEMI(initialValue.Loan_amount, initialValue.interest, initialValue.time));

        setEMITableData(loanEMIData(initialValue.Loan_amount, initialValue.interest, initialValue.time));


    }, [initialValue])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialValue({ ...initialValue, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialValue({ ...initialValue, [event.target.name]: event.target.value })
    }






    return (
        <Container maxWidth='xl' sx={{ padding: '1rem' }}>
            <Box sx={{ lg: { m: "10px" }, height: 'minContent' }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" color="inherit" >Loan EMI Calculator</Typography>
                </Stack >
                <Grid container rowSpacing={2} columnSpacing={1} sx={{ my: '25px', maxWidth: "100%" }}>
                    <Grid item xs={12} md={12} sx={{ display: { xs: 'block', md: 'flex' } }}>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '100%' } }}>
                            <Stack spacing={4}>
                                <InputSlider
                                    isStartAdornment={true}
                                    title='Loan Amount'
                                    name='Loan_amount'
                                    min={10000}
                                    max={5000000}
                                    stepSize={100}
                                    endormentIcon='₹'
                                    onChangeHandle={handlerChange}
                                    onChangeSliderHandler={handlerChangeSlider}
                                    value={initialValue.Loan_amount} />
                                <InputSlider
                                    isStartAdornment={false}
                                    title='Interest rate (% PA)'
                                    name='interest'
                                    min={1}
                                    max={30}
                                    stepSize={0.1}
                                    endormentIcon='%'
                                    onChangeHandle={handlerChange}
                                    onChangeSliderHandler={handlerChangeSlider}
                                    value={initialValue.interest} />
                                <InputSlider
                                    isStartAdornment={false}
                                    title='Time Period'
                                    name='time'
                                    min={1}
                                    max={40}
                                    stepSize={1}
                                    endormentIcon='Yr.'
                                    onChangeHandle={handlerChange}
                                    onChangeSliderHandler={handlerChangeSlider}
                                    value={initialValue.time} />
                            </Stack>
                            <Stack spacing={4} sx={{ mt: '3rem' }} >
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Monthly Loan EMI</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {monthlyPayment}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Loan Amount</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {initialValue.Loan_amount}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Interest Amount</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {(monthlyPayment * initialValue.time * 12 - initialValue.Loan_amount)}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Total Amount Payable</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {monthlyPayment * initialValue.time * 12}</Typography>
                                </FlexWrapper>
                            </Stack>

                        </Paper>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '100%' }, display: 'flex', alignItems: 'center' }} >
                            <DonoutChart initialAmt={initialValue.Loan_amount} totalAmount={monthlyPayment * initialValue.time * 12} title1='Loan Amount' title2='Total value' />
                        </Paper>

                    </Grid>
                    {/* <Grid item xs={12} md={5}> */}
                    {/* <Paper elevation={3} sx={{ width: '100%' }}>
                            <LineChartGraph dataValue={lineChartdata} />
                        </Paper> */}
                    {/* </Grid> */}

                </Grid>
                <CustomTable columns={columns} data={EMITableData} />
            </Box>
        </Container>
    )
}

export default LoanEMICalculator