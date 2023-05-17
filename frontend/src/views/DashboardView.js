import React from 'react';
import { useFetchTimeRegistrationsQuery, useAddTimeRegistrationMutation } from '../redux/timeRegistrationSlice';
import dayjs from 'dayjs';
import Button from "@mui/material/Button";

const DashboardView = () => {
    // const startDate = dayjs().format('DD-MM-YYYY')
    // const { data, error, isLoading } = useFetchTimeRegistrationsQuery('24-04-2023')
    const [addTimeRegistration, {isLoading: isUpdating}] = useAddTimeRegistrationMutation()
    // console.log('TESTING: ', data, error, isLoading)
    // console.log('IS UPDATING: ', isUpdating)
    return (
        <div>
            <h1>DASHBOARD</h1>
            <Button
                onClick={() => addTimeRegistration({
                    start: '26-04-2023 12:00',
                    end: '26-04-2023 13:00',
                    project_id: 'GO_01',
                    description: 'TEST QUERY',
                    external_reference: '1234'
                }) }
            >
                Create new entry
            </Button>
        </div>
    )
}

export default DashboardView;

