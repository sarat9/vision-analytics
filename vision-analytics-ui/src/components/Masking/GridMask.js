import React, { useEffect, useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormatPaintSharpIcon from '@material-ui/icons/FormatPaintSharp';
import BrushSharpIcon from '@material-ui/icons/BrushSharp';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';


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


function MaskOperationButtons(props) {

    const classes = useStyles()
    const { handleColorSelection, handleUndo, handleRedo, regionSpecifier } = props

    return <>
        <div className="mask-paint-colors-container">
            <IconButton
                className={classes.margin}
                disabled
                style={{
                    width: '25px',
                    height: '25px',
                    padding: '5px',
                    margin: '0px 5px',
                }}
            >
                <FormatPaintSharpIcon fontSize="small" />
            </IconButton>
            {Object.keys(regionSpecifier).map(region => {
                return <IconButton
                    className={classes.margin}
                    style={{
                        width: '25px',
                        height: '25px',
                        padding: '5px',
                        margin: '0px 3px',
                        background: regionSpecifier[region]
                    }}
                    onClick={() => handleColorSelection(region, regionSpecifier[region])}>
                    <BrushSharpIcon fontSize="small" />
                </IconButton>
            })}
            <div className="undo-redo-class" style={{ marginLeft: '25px', display: 'inline' }}>
                <IconButton
                    className={classes.margin}
                    style={{
                        width: '25px',
                        height: '25px',
                        padding: '5px',
                        margin: '0px 5px',
                        background: 'grey'
                    }}
                    onClick={() => handleUndo()}
                >
                    <UndoIcon fontSize="small" />
                </IconButton>
                <IconButton
                    className={classes.margin}
                    style={{
                        width: '25px',
                        height: '25px',
                        padding: '5px',
                        margin: '0px 5px',
                        background: 'grey'
                    }}
                    onClick={() => handleRedo()}
                >
                    <RedoIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
        <br /> <br />
    </>

}



function GridMask(props) {
    const classes = useStyles()
    const { maskItem, regionSpecifier } = props
    const canvasRef = useRef(null)

    let [maskGridTiles, setMaskGridTiles] = useState([])
    let [undoRedoMap, setUndoRedoMap] = useState({
        undo: [],
        allOperations: []
    })

    let [properties, setProperties] = useState({
        level: 8,
    })


    const getCordinates = (e) => {
        e.preventDefault()
        const canvas = canvasRef.current
        var rect = canvas.getBoundingClientRect();
        var xAxis = e.clientX - rect.left;
        var yAxis = e.clientY - rect.top;
        return { xAxis, yAxis }
    }

    const selectGridLevel = (level = 8) => {
        properties.columns = 8;
        properties.rows = 8;
    }

    const calculateTileSize = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //calculating Size of tiles
        let width, height;
        canvas.width = width = 640;
        canvas.height = height = 480;
        properties.tileWidth = width / properties.columns;
        properties.tileHeight = height / properties.rows;
    }


    const createRectangularGrid = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        for (let y = 0; y < properties.rows; y++) {
            for (let x = 0; x < properties.columns; x++) {
                // context.strokeStyle = "rgba(192, 195, 199, 0.25)";
                context.strokeStyle = "yellow";
                context.strokeRect(x * properties.tileWidth, y * properties.tileHeight, properties.tileWidth, properties.tileHeight);
            }
        }
    }

    function handleColorSelection(region, color) {
        properties.region = region;
        properties.color = color;
    }

    function initializeGridLayout() {
        selectGridLevel();
        calculateTileSize()
        createRectangularGrid()
    }

    function eraseColor(e) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const { xAxis, yAxis } = getCordinates(e)
        // Get Grid Tile Index from mouse position
        let xIndex = Math.round((xAxis - properties.tileWidth * 0.5) / properties.tileWidth);
        let yIndex = Math.round((yAxis - properties.tileHeight * 0.5) / properties.tileHeight);
        //gridIndex 
        const gridIndex = ((xIndex + 1) + (yIndex * properties.columns)) - 1;
        context.clearRect(xIndex * properties.tileWidth, yIndex * properties.tileHeight, properties.tileWidth, properties.tileHeight);
        maskGridTiles[gridIndex] = null;

        //undo
        undoRedoMap.undo.push({
            gridIndex: gridIndex,
            region: properties.region,
            color: properties.color
        });
    }

    function highlightColor(e) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const { xAxis, yAxis } = getCordinates(e)
        // Get Grid Tile Index from mouse position
        let xIndex = Math.round((xAxis - properties.tileWidth * 0.5) / properties.tileWidth);
        let yIndex = Math.round((yAxis - properties.tileHeight * 0.5) / properties.tileHeight);
        //gridIndex 
        const gridIndex = ((xIndex + 1) + (yIndex * properties.columns)) - 1;

        if ((maskGridTiles[gridIndex]) == properties.color) {
            //If Selected again with same color, then deselect.
            context.fillStyle = "#000000";
            context.clearRect(
                xIndex * properties.tileWidth,
                yIndex * properties.tileHeight,
                properties.tileWidth,
                properties.tileHeight
            );
            maskGridTiles[gridIndex] = null;

            // undo
            undoRedoMap.undo.push({
                gridIndex: gridIndex,
                region: properties.region,
                color: properties.color
            });
        } else {
            //If Selected a NON empty block , Deleting the axis from previos color list
            if (maskGridTiles[gridIndex] != null || maskGridTiles[gridIndex] != undefined) {

            }
            //If Selected an Empty Block
            context.fillStyle = properties.color
            maskGridTiles[gridIndex] = properties.color;

            context.fillRect(
                xIndex * properties.tileWidth,
                yIndex * properties.tileHeight,
                properties.tileWidth,
                properties.tileHeight
            );

            // undoRedo
            undoRedoMap.allOperations.push({
                gridIndex: gridIndex,
                region: properties.region,
                color: properties.color
            });
        }

    }

    const handleUndo = (e) => {
        if (undoRedoMap && undoRedoMap.allOperations && undoRedoMap.allOperations.length > 0) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            let lastObject = undoRedoMap.allOperations.pop()
            undoRedoMap.undo.push(lastObject)
            context.clearRect(
                ((lastObject.gridIndex % properties.rows) * properties.tileWidth),
                (Math.floor(lastObject.gridIndex / properties.columns) * properties.tileHeight),
                properties.tileWidth,
                properties.tileHeight
            );
        }
    }

    const handleRedo = (e) => {
        if (undoRedoMap && undoRedoMap.undo && undoRedoMap.undo.length > 0) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            let lastObject = undoRedoMap.undo.pop()
            undoRedoMap.allOperations.push(lastObject)

            maskGridTiles[lastObject.gridIndex] = lastObject.color;
            context.fillStyle = lastObject.color;

            context.fillRect(
                ((lastObject.gridIndex % properties.rows) * properties.tileWidth),
                (Math.floor(lastObject.gridIndex / properties.columns) * properties.tileHeight),
                properties.tileWidth,
                properties.tileHeight
            )
        }
    }


    const handleCanvasClick = (e) => {
        e && e.preventDefault()
        if (properties.eraseStatus == true) {
            eraseColor(e);
        } else {
            if (properties.color) {
                highlightColor(e)
            } else {
                console.log('Please chose a region color...')
            }
        }

    }

    useEffect(() => {
        initializeGridLayout()
    })


    return (
        <div className='masking-component-container'>
            <Grid container spacing={2}>
                <MaskOperationButtons
                    regionSpecifier={regionSpecifier}
                    handleColorSelection={handleColorSelection}
                    handleUndo={handleUndo}
                    handleRedo={handleRedo}
                />
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

GridMask.defaultProps = {
    maskItem: 'https://media-cdn.tripadvisor.com/media/photo-s/07/06/cc/3f/phoenix-marketcity.jpg',
    regionSpecifier: { direction: "#03D0FF", velocity: "#124191", dwell: "#05A18F", density: "#9906EF" }
}

export default (GridMask)