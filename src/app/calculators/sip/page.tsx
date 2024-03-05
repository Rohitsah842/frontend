'use client'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Paper, Stack } from "@mui/material"
import InputSlider from '@/components/InputSlider'
import DonoutChart from '@/components/DonoutChart'
import { sipInterestAmt } from '@/utils/sipInterestCal'
import { investmenttypeData } from '@/Assets/constants/investmentType'
import SelectDropDown from '@/components/SelectDropDown'
import { SelectChangeEvent } from '@mui/material/Select';
import { get } from 'lodash'
import { lumpsumAmmount } from '@/utils/lumpSumCal'
import FlexWrapper from '@/components/FlexWrapper'
import LineChartGraph from '@/components/LineChart'
import { lineChartDataCal } from '@/utils/lineChartDataCal'

const SIPCalculator = () => {
    const [initialInvestment, SetInitialInvestment] = useState({
        amount: 5000,
        interest: 12,
        time: 5

    })

    const [maturityAmt, setMaturityAmount] = useState<number>(0);
    const [investmentType, setInvestmentType] = useState<string>('monthly')
    const [toalPrinciple, setToalPrinciple] = useState<number>(0)
    const [lineChartdata, setLineChartdata] = useState<Array<{ showMark: boolean, data: number[], label: string }>>([]);

    const menuItems = [
        { title: "Montly", value: 'monthly' },
        { title: "Quaterly", value: 'quaterly' },
        { title: "Half-Yearly", value: 'half-yearly' },
        { title: "Yearly", value: 'yearly' },
        { title: "Lump sum", value: 'lumpsum' }

    ]

    useEffect(() => {
        if (get(investmenttypeData, `${investmentType}.type`) === 'SIP') {
            setMaturityAmount(sipInterestAmt(initialInvestment.amount, initialInvestment.interest, initialInvestment.time, get(investmenttypeData, `${investmentType}.noOfPayment`, 0)));
            setToalPrinciple(initialInvestment.amount * initialInvestment.time * get(investmenttypeData, `${investmentType}.noOfPayment`, 0))
            setLineChartdata(lineChartDataCal(initialInvestment.amount, initialInvestment.interest, get(investmenttypeData, `${investmentType}.noOfPayment`, 0), "SIP"))


        } else {
            setMaturityAmount(lumpsumAmmount(initialInvestment.amount, initialInvestment.interest, initialInvestment.time));
            setToalPrinciple(initialInvestment.amount * get(investmenttypeData, `${investmentType}.noOfPayment`, 0))
        }


    }, [initialInvestment, investmentType])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetInitialInvestment({ ...initialInvestment, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlerChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        !!event.target && SetInitialInvestment({ ...initialInvestment, [event.target.name]: event.target.value })
    }

    const handlerChangeSelect = (event: SelectChangeEvent) => {
        setInvestmentType(event.target.value)
    }




    return (
        <Container maxWidth='xl' sx={{ height: 'calc(100vh - 65px)', padding: '1rem' }}>
            <Stack spacing={2} sx={{ lg: { m: "10px" }, height: '100vh' }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" color="inherit" >SIP Calculators</Typography>
                    <SelectDropDown value={investmentType} onChangeHandler={handlerChangeSelect} menuItems={menuItems} />
                </Stack >
                <Grid container rowSpacing={2} columnSpacing={1} sx={{ m: '0', maxWidth: "100%" }}>
                    <Grid item xs={12} md={7} sx={{ display: { xs: 'block', md: 'flex' } }}>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '60%' } }}>
                            <Stack spacing={4}>
                                <InputSlider isStartAdornment={true} title={get(investmenttypeData, `${investmentType}.title`)} name='amount' min={500} max={100000} stepSize={50} endormentIcon='₹' onChangeHandle={handlerChange} onChangeSliderHandler={handlerChangeSlider} value={initialInvestment.amount} />
                                <InputSlider isStartAdornment={false} title='Expected return rate (p.a)' name='interest' min={1} max={30} stepSize={0.1} endormentIcon='%' onChangeHandle={handlerChange} onChangeSliderHandler={handlerChangeSlider} value={initialInvestment.interest} />
                                <InputSlider isStartAdornment={false} title='Time Period' name='time' min={1} max={40} stepSize={1} endormentIcon='Yr.' onChangeHandle={handlerChange} onChangeSliderHandler={handlerChangeSlider} value={initialInvestment.time} />
                            </Stack>
                            <Stack spacing={4} sx={{ mt: '3rem' }} >
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Investment amount</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {toalPrinciple}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Interest return</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {maturityAmt - toalPrinciple}</Typography>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Typography variant='body1' color="inherit" >Total amount</Typography>
                                    <Typography variant="body1" color="inherit" >₹ {maturityAmt}</Typography>
                                </FlexWrapper>
                            </Stack>

                        </Paper>
                        <Paper elevation={3} sx={{ width: { xs: '100%', md: '35%' } }}>
                            <DonoutChart principalAmt={toalPrinciple} totalAmount={maturityAmt} />
                        </Paper>

                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ width: '100%' }}>
                            <LineChartGraph dataValue={lineChartdata} />
                        </Paper>
                    </Grid>

                </Grid>
            </Stack>
        </Container>
    )
}

export default SIPCalculator