import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import Grid from '@mui/material/Grid';
import Card from '../components/layout/Card';
import { useFetchDashboardDataQuery } from '../redux/timeRegistrationSlice';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const DashboardPage = () => {
    const { data: dashboardData, isLoading } = useFetchDashboardDataQuery();
    const [formattedData, setFormattedData] = useState([]);
    const [dataLabels, setDataLabels] = useState([]);

    useEffect(() => {
        if (dashboardData && !isLoading) {
            setFormattedData(dashboardData.map((d) => d.total_duration / 3600));
            setDataLabels(dashboardData.map((d) => (d.sub_project__name ? d.sub_project__name : 'Overig')));
        }
    }, [dashboardData, isLoading]);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const dataBarChart = {
        labels: dataLabels,
        datasets: [
            {
                data: formattedData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                xs={12}
                md={12}
                lg={12}
            >
                <Card title="Verdeling aantal uren per project voor mei 2023">
                    <Bar
                        options={options}
                        data={dataBarChart}
                        height={400}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
