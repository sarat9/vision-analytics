import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';

import { withRouter } from 'react-router-dom'


import CameraDetails from './SubComponents/CameraDetails'
import CameraMask from './SubComponents/CameraMask'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    cameratitle: {
        textTransform: 'uppercase',
        color: '#3e4152',
        letterSpacing: '.15em',
        fontSize: '1.2em',
    },
    cameraInfoRow: {
        display: 'flex'
    },
    cameraInfoColumnKey: {
        width: '30%',
        margin: '0px'
    },
    cameraInfoColumnValue: {
        margin: '0px'
    }
}));



function CamerasLayout(props) {
    const classes = useStyles()
    const { cameraListData } = props
    const [expanded, setExpanded] = useState(null)
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleExpansionPanel = panel => (event, expanded) => {
        event.preventDefault()
        setExpanded(expanded ? panel : null)
    };


    useEffect(() => {
        return () => {
            //unmount

        }
    }, [])

    return (
        <div className='shop-layout-page'>
            <h4 class={classes.cameratitle}>Cameras</h4>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <div style={{ width: '100%' }}>
                        {cameraListData.map((camera, index) => {
                            return <ExpansionPanel expanded={expanded === camera.id} onChange={handleExpansionPanel(camera.id)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>{camera.model}</Typography>
                                    <Typography className={classes.secondaryHeading}>{camera.ipaddress}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{ width: '100%' }}>
                                        <Paper square>
                                            <Tabs
                                                value={value}
                                                textColor="primary"
                                                indicatorColor="primary"
                                                onChange={handleChangeTab}
                                                aria-label="disabled tabs example"
                                            >
                                                <Tab label="Camera Details" />
                                                <Tab label="Geo-Location" />
                                                <Tab label="Tripwire" />
                                                <Tab label="Region Mask" />
                                            </Tabs>
                                        </Paper>
                                        <TabPanel value={value} index={0}>
                                            <div style={{ width: '100%' }}>
                                                <CameraDetails
                                                    camera={camera}
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <div style={{ width: '100%', height: '700px' }}>
                                                <p> Geo Location Under Progress </p>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <div style={{ width: '100%' }}>
                                                <CameraMask
                                                    maskType='tripwire'
                                                    camera={camera}
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            <div style={{ width: '100%' }}>
                                                <CameraMask
                                                    maskType='gridmask'
                                                    camera={camera}
                                                />
                                            </div>
                                        </TabPanel>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        })}

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            indicatorColor="primary"
            textColor="primary"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

CamerasLayout.defaultProps = {
    cameraListData: [
        {
            id: 'XDFSYUTWIUWOPOJ',
            model: 'XFSH Camera',
            imeinumber: 'XDFSYUTWIUWOPOJ',
            manufacturer: 'Dixon Tech',
            ipaddress: '123.123.123.123',
            imageView: 'https://media-cdn.tripadvisor.com/media/photo-s/07/06/cc/3f/phoenix-marketcity.jpg',
            location: {
                city: 'Vizag',
                latitude: '10.34.455.444',
                longitude: '76.232.23.3.32'
            }
        },
        {
            id: 'MJAUTWIUWOPOJ',
            model: 'JSFR Camera',
            imeinumber: 'MJAUTWIUWOPOJ',
            manufacturer: 'Dixon Tech',
            ipaddress: '123.123.123.123',
            imageView: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/12/27/636977-mall-122817.jpg',
            location: {
                city: 'Vizag',
                latitude: '10.34.455.444',
                longitude: '76.232.23.3.32'
            }
        },
        {
            id: 'JSGRTWIUWOPOJ',
            model: 'VFSC Camera',
            imeinumber: 'JSGRTWIUWOPOJ',
            manufacturer: 'Dixon Tech',
            ipaddress: '123.123.123.123',
            imageView: 'https://imgk.timesnownews.com/story/retail_0.jpg?tr=w-1200,h-900',
            location: {
                city: 'Vizag',
                latitude: '10.34.455.444',
                longitude: '76.232.23.3.32'
            }
        },
    ]
}

export default withRouter(CamerasLayout)