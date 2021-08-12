import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'


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



function CameraDetails(props) {
    const classes = useStyles()
    const { camera } = props


    useEffect(() => {
        return () => {
            //unmount

        }
    }, [])

    return (
        <div className='shop-layout-page'>
            <h4 class={classes.cameratitle}>Cameras</h4>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <img className='default-image' src={camera.imageView} style={{ width: '560px', height: '400px' }} />
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.cameraInfoRow}>
                        <h2 className={classes.cameraInfoColumnKey}> Model</h2>
                        <h2 className={classes.cameraInfoColumnValue}>{camera.model}</h2>
                    </div>
                    <br />
                    <div className={classes.cameraInfoRow}>
                        <p className={classes.cameraInfoColumnKey}> IMEI Number</p>
                        <p className={classes.cameraInfoColumnValue}>{camera.imeinumber}</p>
                    </div>
                    <div className={classes.cameraInfoRow}>
                        <p className={classes.cameraInfoColumnKey}> Manufacturer</p>
                        <p className={classes.cameraInfoColumnValue}>{camera.manufacturer}</p>
                    </div>
                    <div className={classes.cameraInfoRow}>
                        <p className={classes.cameraInfoColumnKey}> IP Address</p>
                        <p className={classes.cameraInfoColumnValue}>{camera.ipaddress}</p>
                    </div>
                    <br />
                    <div className={classes.cameraInfoRow}>
                        <p className={classes.cameraInfoColumnKey}> City</p>
                        <p className={classes.cameraInfoColumnValue}>{camera.location.city}</p>
                    </div>
                    <div className={classes.cameraInfoRow}>
                        <p className={classes.cameraInfoColumnKey}> Cordinates</p>
                        <p className={classes.cameraInfoColumnValue}>{camera.location.latitude}, {camera.location.longitude}</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

CameraDetails.defaultProps = {
    camera: {
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
    }
}

export default withRouter(CameraDetails)