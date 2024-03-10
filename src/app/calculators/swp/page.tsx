'use client'
import React, { useEffect, useState } from 'react'
import {
    Container, Grid, Typography, Paper, Stack,
    Box
} from "@mui/material"
import InputSlider from '@/components/InputSlider'
import DonoutChart from '@/components/DonoutChart'
import FlexWrapper from '@/components/FlexWrapper'
import LineChartGraph from '@/components/LineChart'
import { SWPCalculation, SwpTableDataType } from '@/utils/swpCal'
import CustomTable, { ColumnDefinitionType } from '@/components/CustomTable'
// import { lineChartDataCal } from '@/utils/lineChartDataCal'



const SWPCalculator = () => {

    const [initialInvestment, SetInitialInvestment] =
        useState({
            investment_amount: 50000,
            withdraw_amount: 5000,
            interest: 12,
            time: 3

        })

    const [swpTableData, setSwpTableData] = useState<SwpTableDataType[]>([]);
    const [toalinterestEarn, setToalinterestEarn] = useState<number>(0)
    const [finalValue, setFinalValue] = useState<number>(0);
    // const [lineChartdata, setLineChartdata] = useState<Array<{ showMark: boolean, data: number[], label: string }>>([]);
    const columns: ColumnDefinitionType<SwpTableDataType, keyof SwpTableDataType>[] = [
        {
            key: "month",
            header: "Month"
        },
        {
            key: 'balanceAtBegin',
            header: "Balance at Begin (₹)"
        },
        {
            key: 'withdraw',
            header: "Withdrawal (₹)"
        },
        {
            key: 'interestEarn',
            header: "Interest Earned (₹)"
        },
        {
            key: 'remainingBalance',
            header: "Balance at End (₹)"
        }
    ]


    useEffect(() => {

        setSwpTableData(SWPCalculation(initialInvestment.investment_amount, initialInvestment.withdraw_amount, initialInvestment.interest, initialInvestment.time));
        setToalinterestEarn(calculateTotalInterestEarn(SWPCalculation(initialInvestment.investment_amount, initialInvestment.withdraw_amount, initialInvestment.interest, initialInvestment.time)));


    }, [initialInvestment])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialInvestment({ ...initialInvestment, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialInvestment({ ...initialInvestment, [event.target.name]: event.target.value })
    }

    const calculateTotalInterestEarn = (swpData: SwpTableDataType[]): number => {
        let totalInterest = swpData.reduce((sum, data) => {
            return sum + data.interestEarn;
        }, 0)
        let len = swpData.length
        setFinalValue(swpData[len - 1].remainingBalance);
        return totalInterest;
    }





    return (
        <Container maxWidth='xl' sx={{ height: 'calc(100vh - 65px)', padding: '1rem' }}>
            <Box sx={{ lg: { m: "10px" }, height: 'minContent' }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" color="inherit" >SWP(Systematic Withdrawal Plan) Calculators</Typography>
                </Stack >
                <Grid container rowSpacing={2} columnSpacing={1} sx={{ m: '0', maxWidth: "100%" }}>
                    <Grid item xs={12} md={7} sx={{ display: { xs: 'block', md: 'flex' } }}>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '60%' } }}>
                            <Stack spacing={4}>
                                <InputSlider
                                    isStartAdornment={true}
                                    title='Total investment'
                                    name='investment_amount'
                                    min={10000}
                                    max={5000000}
                                    stepSize={100}
                                    endormentIcon='₹'
                                    onChangeHandle={handlerChange}
                                    onChangeSliderHandler={handlerChangeSlider}
                                    value={initialInvestment.investment_amount} />
                                <InputSlider
                                    isStartAdornment={true}
                                    title='Withdrawal per month'
                                    name='withdraw_amount'
                                    min={500}
                                    max={50000}
                                    stepSize={50}
                                    endormentIcon='₹'
                                    onChangeHandle={handlerChange}
                                    onChangeSliderHandler={handlerChangeSlider}
                                    value={initialInvestment.withdraw_amount} />
                                <InputSlider
                                    isStartAdornment={false}
                                    title='Expected return rate (p.a)'
                                    name='interest'
                                    min={1}
                                    max={30}
                                    stepSize={0.1}
                                    endormentIcon='%'
                                    onChangeHandle={handlerChange}
                                    onChangeSliderHandler={handlerChangeSlider}
                                    value={initialInvestment.interest} />
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
                                    value={initialInvestment.time} />
                            </Stack>
                            <Stack spacing={4} sx={{ mt: '3rem' }} >
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Total investment</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {initialInvestment.investment_amount}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Total withdrawal</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {initialInvestment.withdraw_amount * swpTableData.length}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Total Interest Earned</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {toalinterestEarn}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >final value</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {finalValue}</Typography>
                                </FlexWrapper>
                            </Stack>

                        </Paper>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '35%' } }}>
                            {/* <DonoutChart principalAmt={toalPrinciple} totalAmount={maturityAmt} /> */}
                        </Paper>

                    </Grid>
                    {/* <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ width: '100%' }}>
                            <LineChartGraph dataValue={lineChartdata} />
                        </Paper>
                    </Grid> */}

                </Grid>
                <CustomTable columns={columns} data={swpTableData} />

            </Box>
        </Container>
    )
}

export default SWPCalculator