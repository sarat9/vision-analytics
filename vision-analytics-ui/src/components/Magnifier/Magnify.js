import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));



function Magnify(props) {
    const classes = useStyles()
    const { image, imageSet } = props

    const srcSet = [...imageSet].join(', ')

    return (
        <div className='magnify-layout-page'>
            <Grid container spacing={2}>

                <Grid item xs={12} md={12}>
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: image,
                            // srcSet: srcSet,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                            src: image,
                            // srcSet: srcSet,
                            width: 1200,
                            height: 1800
                        },
                        enlargedImageContainerDimensions: {
                            width: '120%',
                            height: '100%',
                        }
                    }} />
                </Grid>
            </Grid>
        </div>
    )
}

Magnify.defaultProps = {

    image: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/11591b03-97f1-4907-b735-906984c4bcd61585905051096HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt1.jpg',
    imageSet: ['https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/11591b03-97f1-4907-b735-906984c4bcd61585905051096HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt1.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/147a0179-be1b-4c00-80fb-6eba0ecbdbb31585905051158HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt2.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/f7d5991f-9b9a-4a2d-915d-8b6da08da8ca1585905051230HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt3.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/9f896858-2c78-4a94-b93c-0a6b32f6e8721585905051288HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt4.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/3931e195-74a8-40ad-89a3-8e3bd8dad8b91585905051352HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt5.jpg',
        'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11780968/2020/4/3/456b5475-dedf-459b-ae82-a839c20bd8101585905051410HIGHLANDERMenGreenWhiteSlimFitPrintedCasualShirt6.jpg',
    ]

}

export default (Magnify)



/**
 * https://github.com/ethanselzer/react-image-magnify
 */