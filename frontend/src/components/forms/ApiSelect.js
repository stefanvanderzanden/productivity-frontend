import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {FormControl} from "@mui/material";

const ApiSelect = ({label, name, initialValue, valueProp, displayProp, onChange, fetchQuery, customIsOptionEqualToValue}) => {
    const {data, isLoading} = fetchQuery();
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

    const getOptionLabel = (option) => {
        if (typeof displayProp === 'function') {
            return displayProp(option);
        } else {
            return option[displayProp]
        }
    }

    const compareOptionToValue = (option, value) => {
        if (typeof customIsOptionEqualToValue === 'function') {
            return customIsOptionEqualToValue(option, value)
        } else {
            return option[displayProp] === value[displayProp]
        }
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
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={compareOptionToValue}
                noOptionsText='Geen opties gevonden'
                renderOption={(props, option) => {
                    return (
                        <Box component='li' {...props} key={option[valueProp]}>
                            {getOptionLabel(option)}
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
    displayProp: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onChange: PropTypes.func,
    fetchQuery: PropTypes.func.isRequired,
    customIsOptionEqualToValue: PropTypes.func
}

export default ApiSelect;
