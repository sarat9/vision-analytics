import React from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
    },
    formLabel: {
        color: '#3e4152',
        fontSize: '1.0em',
        letterSpacing: '.15em',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}));

function RadioButton(props) {
    const classes = useStyles();

    const { title, options, handleChange, selectedValue } = props

    return (
        <FormControl component="fieldset">
            {title && <FormLabel component="legend" className={classes.formLabel}>{title}</FormLabel>}
            <RadioGroup value={selectedValue} onChange={handleChange}>
                {options.map((option, index) => {
                    return <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                })}
            </RadioGroup>
        </FormControl>
    );
}

RadioButton.defaultProps = {
    options: [
        { value: 'option1', label: 'Option One' },
        { value: 'option2', label: 'Option Two' },
        { value: 'disabled', label: 'Option Disabled', disabled: true },
    ]
}


export default RadioButton

