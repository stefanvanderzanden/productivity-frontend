import React, {useEffect, useState} from 'react';
import dayjs from "dayjs";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import TimetrackTable from '../components/tables/timetracks/TimetrackTable';
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Box from "@mui/material/Box";
import Title from "../components/typography/common/Title";
import {useFetchTimeRegistrationsQuery} from "../redux/timeRegistrationSlice";

const TimetrackPage = () => {
    const [weekData, setWeekData] = useState({
        currentDate: dayjs(),
        number: dayjs().isoWeek(),
        startDate: dayjs().isoWeekday(1),
        endDate: dayjs().isoWeekday(7)
    });
    const [activeView, setActiveView] = useState('week');
    const { data, isLoading } = useFetchTimeRegistrationsQuery(weekData.startDate.format('DD-MM-YYYY'))
    const [totalHours, setTotalHours] = useState('00:00')
    const [timeRegistrations, setTimeRegistrations] = useState([])

    const createDurationInHoursMinutes = (seconds) => {
        const totalHours = Math.floor(seconds/(60*60))
        const totalSeconds = seconds - (totalHours*60*60)
        let totalMinutes = Math.floor(totalSeconds/60)
        if (totalMinutes < 10) {
           totalMinutes = `0${totalMinutes}`
        }
        return `${totalHours}:${totalMinutes}`
    }

    useEffect(() => {
        if (!isLoading && data) {
            setTimeRegistrations(data.time_registrations);
            setTotalHours(createDurationInHoursMinutes(data.total));
        }
    }, [data])

    const calculateNewWeekData = (direction) => {
        let newStartDate;
        let newEndDate;
        if (direction === 'increase') {
            newStartDate = weekData.startDate.add(1, 'week');
            newEndDate = weekData.endDate.add(1, 'week');
        } else if (direction === 'decrease') {
            newStartDate = weekData.startDate.subtract(1, 'week');
            newEndDate = weekData.endDate.subtract(1, 'week');
        }
        if (newStartDate) {
            const newData = {
                ...weekData,
                number: newStartDate.week(),
                startDate: newStartDate,
                endDate: newEndDate
            }
            setWeekData(newData);

        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 240,
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                        pb: 1,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        alignItems: 'center'

                    }}>
                        <Box>
                            <Title>
                                Urenregistraties
                            </Title>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                aria-label='delete'
                                size='large'
                                onClick={() => calculateNewWeekData('decrease')}
                            >
                                <KeyboardDoubleArrowLeftIcon fontSize='inherit'/>
                            </IconButton>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Box>
                                    {weekData.startDate.format('dd DD MMM')} - {weekData.endDate.format('dd DD MMM')}, {weekData.startDate.format('YYYY')}
                                </Box>
                            </Box>
                            <IconButton
                                aria-label='delete'
                                size='large'
                                onClick={() => calculateNewWeekData('increase')}
                            >
                                <KeyboardDoubleArrowRightIcon fontSize='inherit'/>
                            </IconButton>
                        </Box>
                        <Box>
                            Totaal: <span style={{fontWeight: 'bold'}}>{totalHours}</span>
                        </Box>
                    </Box>
                    <TimetrackTable
                        timeRegistrations={timeRegistrations}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TimetrackPage;