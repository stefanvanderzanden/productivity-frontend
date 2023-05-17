import {useFetchProjectsQuery} from "../../redux/projectSlice";
import React, {useEffect, useState} from "react";
import {FormControl} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const ApiSelect = ({label, name, initialValue, valueProp, displayProp, onChange}) => {
    const {data, isLoading} = useFetchProjectsQuery();
    const [value, setValue] = useState(null)

    useEffect(() => {
        if (data && !isLoading && initialValue) {
            const foundInitialValue = data.find((d) => d[valueProp] === initialValue)
            setValue(foundInitialValue);
        }
    }, [data])


    const handleChange = (event, value) => {
        setValue(value);
        onChange({name, value: value ? value[valueProp] : null})
    }

    return (
        <FormControl fullWidth>
            <Autocomplete
                id={name}
                name={name}
                sx={{width: '100%'}}
                loading={isLoading}
                options={data || []}
                value={value}
                getOptionLabel={(option) => option[displayProp]}
                isOptionEqualToValue={(option, value) => option[displayProp] === value[displayProp]}
                noOptionsText='Geen opties gevonden'
                renderOption={(props, option) => {
                    return (
                        <Box component='li' {...props} key={option[valueProp]}>
                            {option[displayProp]}
                        </Box>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        { ...params }
                        label={label}
                        inputProps={{
                            ...params.inputProps,
                        }}
                    />
                )}
                onChange={handleChange}
            >
            </Autocomplete>
        </FormControl>
    )
}

ApiSelect.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueProp: PropTypes.string,
    displayProp: PropTypes.string,
    onChange: PropTypes.func
}

export default ApiSelect;
