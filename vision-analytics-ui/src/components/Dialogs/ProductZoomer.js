import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import Magnify from "./../Magnifier/Magnify";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    zoomDescription: {
        textAlign: 'center',
        padding: '35% 0',
        color: 'grey',
        fontWeight: '500'
    }
}));

const styles = {
    demoImages: {
        width: '100%',
        height: 'auto'
    }
}

function ProductZoomer(props) {
    const classes = useStyles();
    const [selectedImage, setSelectedImage] = useState(0)

    const { title, description, imageSet, open, handleClose } = props

    const handleImageSelect = (index) => {
        setSelectedImage(index)
    }


    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'md'} //xs, sm, md, lg, xl
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
                style={{top:'8%'}}
            >
                <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText> {description} </DialogContentText> */}
                    <Grid container spacing={2}>
                        <Grid item xs={1} md={1}>
                            {imageSet && imageSet.map((image, index) => {
                                return <>
                                    <div style={{background:(index==selectedImage)?'deeppink':'grey', padding:'2px', margin:'2px'}}>
                                        <img style={styles.demoImages} src={image} onClick={()=>handleImageSelect(index)} />
                                    </div>
                                </>
                            })}
                        </Grid>
                        <Grid item xs={6} md={5}>
                            <Magnify
                                image={imageSet[selectedImage]}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <p className={classes.zoomDescription}>Zoom Over Your Favorite Image...</p>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

ProductZoomer.defaultProps = {

    title:'Product',
    description:'Description',
    imageSet: ['https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/11591b03-97f1-4907-b735-906984c4bcd61585905051096HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt1.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/147a0179-be1b-4c00-80fb-6eba0ecbdbb31585905051158HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt2.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/f7d5991f-9b9a-4a2d-915d-8b6da08da8ca1585905051230HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt3.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/9f896858-2c78-4a94-b93c-0a6b32f6e8721585905051288HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt4.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/3931e195-74a8-40ad-89a3-8e3bd8dad8b91585905051352HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt5.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/456b5475-dedf-459b-ae82-a839c20bd8101585905051410HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt6.jpg',
    ]

}


export default ProductZoomer