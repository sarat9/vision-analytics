import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'
import BarChart from './../../components/Charts/Bar/BarChart'
import StackedAreaChart from './../../components/Charts/Area/StackedAreaChart'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    dealsContainer: {
        margin: '0px 20px 0px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dealImage: {
        height: 'auto',
        width: '100%'
    },
    textBannerTitle: {
        textTransform: 'uppercase',
        color: '#3e4152',
        letterSpacing: '.15em',
        fontSize: '1.8em',
    }
}));



function AnomalyCharts(props) {
    const classes = useStyles()
    const { dealsList } = props

    return (
        <div className='deals-of-the-day-layout-page'>
            <Grid container spacing={2}>
                <div class="text-banner-container">
                    <h4 class={classes.textBannerTitle}>Anomaly Charts</h4>
                </div>

                <Grid className={classes.dealsContainer} container spacing={4}>
                    <Grid item xs={4}>
                        <BarChart />
                    </Grid>
                    <Grid item xs={4}>
                        <StackedAreaChart />
                    </Grid>
                    <Grid item xs={4}>
                        <BarChart />
                    </Grid>                    
                </Grid>

            </Grid>
        </div>
    )
}

AnomalyCharts.defaultProps = {

}



export default AnomalyCharts