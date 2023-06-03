import React from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import Grid from "@mui/material/Grid";
import Card from "../components/layout/Card";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
)
;

const DashboardPage = () => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataBarChart = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [100, 100, 100, 100, 100, 100, 100, 100],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [200, 200, 200, 200, 200, 200, 200],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    const dataPieChart = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            {/*<Grid item xs={12} md={4} lg={4}>*/}
            {/*    <Card title='Verdeling'>*/}
            {/*        <Pie data={dataPieChart}/>*/}
            {/*    </Card>*/}
            {/*</Grid>*/}
            <Grid item xs={12} md={12} lg={12}>
                <Card title='Vergelijking'>
                    <Bar
                        options={options}
                        data={dataBarChart}
                        height={400}
                    />
                </Card>
            </Grid>
        </Grid>

    )
}

export default DashboardPage;

