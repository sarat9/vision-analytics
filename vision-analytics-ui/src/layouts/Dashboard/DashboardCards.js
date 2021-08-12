import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
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



function DashboardCards(props) {
    const classes = useStyles()

    const cardsData = [
        {
            title: 'Cameras',
            description: 'List of Cameras',
            thumbnail: 'http://bostonreview.net/sites/default/files/Surveillance-camera_0.png',
            routeUrl:'/cameras'
        },
        {
            title: 'Surveillance',
            description: 'Surveillance',
            thumbnail: 'https://www.eff.org/files/banner_library/sls-social_1_0.png',
            routeUrl:'/surveillance'
        },
        {
            title: 'Anomalies',
            description: 'Track Past Anomalies',
            thumbnail: 'https://engineering.fb.com/wp-content/uploads/2019/11/Debugging-crash-reports-06.jpg',
            routeUrl:'/anomalies'
        },
    ]
    const { brandList } = props


    function navigateToScreen(url) {
        props.history.push(url)
    }

    return (
        <div className='top-brands-layout-page'>
            <Grid container spacing={2}>
                <div class="text-banner-container">
                    <h4 class={classes.textBannerTitle}> Specify Vision </h4>
                    <h4 class="text-banner-subtitle"></h4>
                </div>
                <Grid container spacing={4}>
                    {cardsData.map(data => {
                        return <Grid item xs={4}>
                            <Card className={classes.root} onClick={()=>navigateToScreen(data.routeUrl)}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={data.title}
                                        height="140"
                                        image={data.thumbnail}
                                        title={data.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                           {data.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    })}
                </Grid>

            </Grid>
        </div>
    )
}

DashboardCards.defaultProps = {
    brandList: [
    ]
}



export default withRouter(DashboardCards)