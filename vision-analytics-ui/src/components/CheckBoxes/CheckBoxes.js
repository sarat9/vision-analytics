import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
    extraOptions: {
        color: '#f50057'
    }
}));

function CheckBoxesGroup(props) {
    const classes = useStyles();
    const { title, options, handleSelect, selectedItems } = props

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.formLabel}>{title}</FormLabel>
                <FormGroup onChange={handleSelect}>
                    {options.map((option, index) => {
                        return <>
                            <FormControlLabel
                                name={option.id}
                                control={<Checkbox checked={selectedItems && selectedItems[option.id] || false} name={option.id} />}
                                label={option.label}
                            /></>
                    })}
                </FormGroup>
                {/* <FormHelperText></FormHelperText> */}
                <p>+120 MORE</p>
            </FormControl>
        </div>
    );
}


CheckBoxesGroup.defaultProps = {
    options: [

    ]
}

export default CheckBoxesGroup