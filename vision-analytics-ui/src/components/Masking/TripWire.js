import React, { useEffect, useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';


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



function TripWire(props) {
    const classes = useStyles()
    const { maskItem } = props
    const canvasRef = useRef(null)

    let [tripWire, setTripWire] = useState([])
    let [mode, setMode] = useState('create')
    let [editables, setEditables] = useState(null)

    const isPolygonClosed = (tripWireData = []) => {
        if (tripWireData.length > 2) {
            const firstPosition = tripWireData[0]
            const lastPosition = tripWireData[tripWireData.length - 1]
            if (firstPosition.xAxis == lastPosition.xAxis && firstPosition.yAxis == lastPosition.yAxis) {
                console.log("polygon already closed- delete current trip to mask again");
                return true
            }
        }
        return false
    }



    const editProcessingTripWire = (selectedCordinates, tripWireData = []) => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (editables && editables.selected) {
            if (editables.editableIndex == 0 || editables.editableIndex == (tripWireData.length - 1)) {
                // if first or last point change both
                tripWireData[0] = selectedCordinates;
                tripWireData[tripWireData.length - 1] = selectedCordinates;

            } else {
                tripWireData[editables.editableIndex] = selectedCordinates;
            }
            paintTripWire(tripWireData)
            editables = {}
        } else {
            editables = {}
            tripWireData.forEach((cord, index) => {
                if (selectionUnderRadiusofCordinate(selectedCordinates, cord)) {
                    editables.editableIndex = index;
                    editables.selected = true;
                }
            })
        }
    }


    const autoClosePolygon = (tripWireData = []) => {
        try {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            if (tripWireData.length > 2) {
                let firstPosition = tripWireData[0];
                let lastPosition = tripWireData[tripWireData.length - 1];

                //Validate - If the polygon is already closed
                if (firstPosition.xAxis == lastPosition.xAxis && firstPosition.yAxis == lastPosition.Axis) {
                    console.log("Polygon Already Closed...");
                }
                else {
                    context.moveTo(lastPosition.xAxis, lastPosition.yAxis);
                    context.strokeStyle = "blue";
                    context.lineWidth = 3;
                    context.lineTo(firstPosition.xAxis, firstPosition.yAxis);
                    context.stroke();
                    let currentPosition = {
                        xAxis: firstPosition.xAxis,
                        yAxis: firstPosition.yAxis
                    };
                    tripWireData.push(currentPosition);
                }
            }
            else {
                console.log("polygon needs more than one side to close ");
            }
        } catch (err) {
            console.log("closePolygon catch err", err);
        }
    }

    const selectionUnderRadiusofCordinate = (latestCordinates, compareCordinates, circleRadius = 3) => {
        let distanceSquared = (latestCordinates.xAxis - compareCordinates.xAxis) * (latestCordinates.xAxis - compareCordinates.xAxis) + (latestCordinates.yAxis - compareCordinates.yAxis) * (latestCordinates.yAxis - compareCordinates.yAxis);
        if (distanceSquared <= circleRadius * circleRadius) {
            //Selected the first oo to close the polygon within radius
            console.log("Latest Selection within RADIUS...");
            return true;
        }
        return false
    }

    const drawStroke = (from, to) => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.beginPath();
        context.moveTo(from.xAxis, from.yAxis);
        context.lineTo(to.xAxis, to.yAxis);
        context.lineWidth = 3;
        context.strokeStyle = "blue";
        context.shadowColor = "yellow";
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }


    const clearCanvas = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }

    const getCordinates = (e) => {
        e.preventDefault()
        const canvas = canvasRef.current
        var rect = canvas.getBoundingClientRect();
        var xAxis = e.clientX - rect.left;
        var yAxis = e.clientY - rect.top;
        return { xAxis, yAxis }
    }


    function paintTripWire(tripWireData = []) {
        clearCanvas()
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.beginPath();

        tripWireData.forEach((cord, index) => {
            if (index == 0) {
                context.moveTo(cord.xAxis, cord.yAxis);
            } else {
                context.lineTo(cord.xAxis, cord.yAxis);
            }
            context.lineWidth = 3;
            context.strokeStyle = "blue";
            context.shadowColor = "yellow";
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
            context.fillStyle = 'red'
            context.fillRect(cord.xAxis, cord.yAxis, 4, 4);
        })
    }


    function paintEndpoint(x, y) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.beginPath();
        context.fillStyle = 'red'
        context.fillRect(x, y, 4, 4);
        // context.strokeStyle = "red"
        // context.strokeRect(x,y,3,3);
    }

    const deleteTripWire = (e) => {
        e && e.preventDefault()
        clearCanvas()
        tripWire = []
        mode = 'create'
        setMode(mode)
    }

    const editTripWire = (e) => {
        if (isPolygonClosed(tripWire)) {
            const { xAxis, yAxis } = getCordinates(e)
            let currentCordinate = { xAxis, yAxis }
            editProcessingTripWire(currentCordinate, tripWire)
        }
    }

    const createTripWire = (e) => {
        e && e.preventDefault()
        if (!isPolygonClosed(tripWire)) {
            const { xAxis, yAxis } = getCordinates(e)
            paintEndpoint(xAxis, yAxis)
            let lastCordinate = tripWire[tripWire.length - 1];
            let currentCordinate = { xAxis, yAxis }
            if (tripWire.length > 2 && selectionUnderRadiusofCordinate(currentCordinate, tripWire[0])) {
                autoClosePolygon(tripWire)
                return
            } else {
                if (lastCordinate) {
                    drawStroke(lastCordinate, currentCordinate)
                }
                tripWire.push(currentCordinate)
            }
        }

    }

    const handleDelete = (e) => {
        e && e.preventDefault()
        deleteTripWire()
    }

    const handleMode = (e) => {
        e && e.preventDefault()
        mode = 'edit'
        setMode(mode)
    }

    const handleCanvasClick = (e) => {
        e && e.preventDefault()
        if (mode == 'create') {
            createTripWire(e)
        }
        else if (mode == 'edit') {
            editTripWire(e)
        }
    }


    return (
        <div className='masking-component-container'>
            <Grid container spacing={2}>
                <div>
                    <IconButton aria-label="delete" disabled className={classes.margin}>
                        <SettingsIcon disabled />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin} onClick={handleDelete}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="edit" className={classes.margin} onClick={handleMode}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>
                <div
                    className='masking-image-canvas'
                    style={{ position: 'relative' }}
                >
                    <img className='default-image' src={maskItem} style={{ width: '640px', height: '480px' }} />
                    <canvas
                        ref={canvasRef}
                        width="640px"
                        height="480px"
                        style={{
                            left: '0px',
                            position: 'absolute',
                            width: '640px',
                            height: '480px',
                        }}
                        onClick={handleCanvasClick}
                    />
                </div>
            </Grid>
        </div>
    )
}

TripWire.defaultProps = {
    maskItem: 'https://media-cdn.tripadvisor.com/media/photo-s/07/06/cc/3f/phoenix-marketcity.jpg',
}

export default (TripWire)