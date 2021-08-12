import React, { useEffect, useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import TripWire from './../../../components/Masking/TripWire'
import GridMask from './../../../components/Masking/GridMask'

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



function CameraMask(props) {
    const classes = useStyles()
    const { camera, maskType } = props
    const canvasRef = useRef(null)

    const [tripWire, setTripWire] = useState([])


    return (
        <div className='masking-layout-page'>
            <h4 class={classes.cameratitle}>Cameras Masking</h4>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {(maskType == "tripwire") && <>
                        <TripWire
                            maskItem={camera.imageView}
                        />
                    </>}
                    {(maskType == "gridmask") && <>
                        <GridMask
                            maskItem={camera.imageView}
                        />
                    </>}

                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </div>
    )
}

CameraMask.defaultProps = {
    maskType: 'tripwire', // [tripwire, gridmask]
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

export default withRouter(CameraMask)