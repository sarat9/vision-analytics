import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { FlickingEvent, SelectEvent, ChangeEvent, NeedPanelEvent } from "@egjs/flicking";
import Flicking from "@egjs/react-flicking";
import { Parallax, Fade, AutoPlay } from "@egjs/flicking-plugins";
import Grid from '@material-ui/core/Grid';

const plugins = [new Fade(), new AutoPlay(2000, "NEXT")];



const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    bannerPanel: {
        width: '100%',
        height: '350px'
    },
    bannerImage: {
        width: '100%',
        height: '350px'
    }
}));



function Banner(props) {
    const classes = useStyles();
    const {bannerDataList} = props
    
    return (
        <>
            <div id="banner-flicking-class" style={{ width: '100%', height: '350px' }}>
                <Flicking
                    style={{ width: '100%', height: '350px' }}
                    // tag="div"
                    // viewportTag="div"
                    // cameraTag="div"
                    // onNeedPanel={(e) => { }}
                    // onMoveStart={(e) => { }}
                    // onMove={(e) => { }}
                    // onMoveEnd={(e) => { }}
                    // onHoldStart={(e) => { }}
                    // onHoldEnd={(e) => { }}
                    // onRestore={(e) => { }}
                    // onSelect={(e) => { }}
                    // onChange={(e) => { }}
                    // classPrefix="eg-flick"
                    // deceleration={0.0075}
                    // horizontal={true}
                    circular={true}
                    // infinite={true}
                    // infiniteThreshold={0}
                    // lastIndex={Infinity}
                    // threshold={40}
                    // duration={100}
                    // panelEffect={x => 1 - Math.pow(1 - x, 3)}
                    // defaultIndex={0}
                    // inputType={["touch", "mouse"]}
                    // thresholdAngle={45}
                    // bounce={10}
                    // autoResize={false}
                    // adaptive={false}
                    // zIndex={2000}
                    // bound={false}
                    // overflow={false}
                    // hanger={"50%"}
                    // anchor={"50%"}
                    gap={10}
                    plugins={plugins}
                    // moveType={{ type: "snap", count: 1 }}
                    collectStatistics={true}
                >
                    {bannerDataList&&bannerDataList.map(banner=>{
                        return <div className={classes.bannerPanel}>
                            <img className={classes.bannerImage} src={banner.src} />
                        </div>
                    })}
                                       
                </Flicking>
            </div>
        </>
    );
}

Banner.defaultProps = {
    bannerDataList:[
        {src: 'https://www.eff.org/files/banner_library/surveillance-camera-1_0.png'},
        {src: 'https://www.bluestarindia.com/media/167853/1600x1080_city-surveillance.jpg'},   
    ]
}


export default Banner

/**
 * 
 * Ref:
https://github.com/naver/egjs-flicking/tree/master/packages/react-flicking
https://naver.github.io/egjs-flicking/
https://codesandbox.io/s/react-flicking-examples-rnqm8?file=/src/index.tsx:891-901
 * 
 */
