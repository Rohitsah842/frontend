import React from 'react'
import { Container, Grid, Typography, Paper, Stack, Box } from "@mui/material"
import SelectDropDown from '@/components/SelectDropDown'
import InputSlider from './InputSlider';
import FlexWrapper from './FlexWrapper';
import DonoutChart from './DonoutChart';
import LineChartGraph from './LineChart';
import CustomTable from './CustomTable';
import { CalculatorComponentPropsType } from '@/types/CalculatorComponentPropsType';
import { dollarIndianLocale } from '@/Assets/constants';

const CalculatorComponent = ({ headingTitle, inputSliderArray, totalValueArray, donoutChartData, lineChartData, tableData, isDropDown = false, dropDown }: CalculatorComponentPropsType) => {



    return (
        <Container maxWidth='xl' sx={{ height: 'calc(100% - 65px)', padding: '1rem' }}>
            <Box sx={{ lg: { m: "10px" } }}>
                <Stack >
                    <Typography variant="h5" color="inherit" >{headingTitle}</Typography>
                </Stack >
                <Grid container spacing={1} sx={{ m: '0', maxWidth: "100%" }}>
                    <Grid item xs={12} md={7} sx={{ display: { xs: 'block', md: 'flex' } }}>
                        <Paper elevation={3} sx={{ width: '100%', display: { xs: 'block', md: 'flex' } }}>
                            <Paper elevation={1} sx={{ flex: 3 }}>
                                {(isDropDown && dropDown !== undefined) && <SelectDropDown value={dropDown.value} onChangeHandler={dropDown.onChangeHandler} menuItems={dropDown.menuItems} />}
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

                                </Stack>
                                <Stack spacing={4} sx={{ mt: '3rem' }} >
                                    {totalValueArray.map((value, i) => {
                                        return (<FlexWrapper key={i}>
                                            <Typography variant='body1' color="inherit" ><b>{value.title} </b></Typography>
                                            <Typography variant="h6" color="inherit" >{!value.isShow ? `₹ ${dollarIndianLocale.format(value.value)}` : (value.value)} </Typography>
                                        </FlexWrapper>)
                                    })}

                                </Stack>
                            </Paper>

                            <DonoutChart chartData={donoutChartData.chartData} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        {lineChartData && <LineChartGraph dataValue={lineChartData.chartData} axisData={lineChartData.axisData} axisLabel={lineChartData.axisLabel} />}

                    </Grid>

                </Grid>
                <CustomTable columns={tableData.columns} data={tableData.data} />
            </Box>
        </Container>
    )
}

export default CalculatorComponent