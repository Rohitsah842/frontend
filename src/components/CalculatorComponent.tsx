import React from 'react'
import { Container, Grid, Typography, Paper, Stack, Box } from "@mui/material"
import SelectDropDown from '@/components/SelectDropDown'
import { SelectChangeEvent } from '@mui/material/Select';
import InputSlider from './InputSlider';
import { investmenttypeData } from '@/Assets/constants/investmentType';
import FlexWrapper from './FlexWrapper';
import DonoutChart from './DonoutChart';
import LineChartGraph from './LineChart';
import CustomTable from './CustomTable';
import { CalculatorComponentPropsType } from '@/types/CalculatorComponentPropsType';
import { dollarIndianLocale } from '@/Assets/constants';

const CalculatorComponent = ({ headingTitle, inputSliderArray, totalValueArray, donoutChartData, lineChartData, tableData, isDropDown = false, dropDown }: CalculatorComponentPropsType) => {



    return (
        <Container maxWidth='xl' sx={{ height: 'calc(100vh - 65px)', padding: '1rem' }}>
            <Box sx={{ lg: { m: "10px" }, height: '100vh' }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" color="inherit" >{headingTitle}</Typography>
                    {/* {isDropDown && <SelectDropDown value={dropDown?.value} onChangeHandler={dropDown?.onChangeHandler} menuItems={dropDown?.menuItems} />} */}
                </Stack >
                <Grid container rowSpacing={2} columnSpacing={0} sx={{ m: '0', maxWidth: "100%" }}>
                    <Grid item xs={12} md={7} sx={{ display: { xs: 'block', md: 'flex' } }}>
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
                                        value={filedValue.value} />
                                })}

                            </Stack>
                            <Stack spacing={4} sx={{ mt: '3rem' }} >
                                {totalValueArray.map((value, i) => {
                                    return (<FlexWrapper key={i}>
                                        <Typography variant='body1' color="inherit" ><b>{value.title} </b></Typography>
                                        <Typography variant="body1" color="inherit" ><b>₹ {dollarIndianLocale.format(value.value)} </b></Typography>
                                    </FlexWrapper>)
                                })}

                            </Stack>

                        </Paper>
                        <DonoutChart chartData={donoutChartData.chartData} />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <LineChartGraph dataValue={lineChartData.chartData} axisData={lineChartData.axisData} axisLabel={lineChartData.axisLabel} />

                    </Grid>

                </Grid>
                <CustomTable columns={tableData.columns} data={tableData.data} />
            </Box>
        </Container>
    )
}

export default CalculatorComponent