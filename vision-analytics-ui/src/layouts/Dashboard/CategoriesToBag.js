import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    allCategoryContainer: {
        margin: '0px 20px 0px 20px',
    },
    categoryContainer: {
        margin: '0px 16px',
        background: '#80808040'
    },
    categoryImage: {
        height: '150px',
        width: '150px',
        margin: 'auto',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center'
    },
    categoryTypeDesc: {
        display: 'flex',
        justifyContent: 'center'
    },
    
}));

const styles = {
    textBannerTitle: {
        textTransform: 'uppercase',
        color: '#3e4152',
        letterSpacing: '.15em',
        fontSize: '1.8em',
    }
}




function CategoriesToBag(props) {
    const classes = useStyles()
    const { categoriesList } = props

    function navigateToPage() {
        scrolltoTop()
        props.history.push('/shop')
    }

    function scrolltoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }


    return (
        <div className='category-to-bag-layout-page'>
            <Grid container spacing={2}>
                <div className="text-banner-container">
                    <h4 className={'textBannerTitle'} style={styles.textBannerTitle} >Amazing Categories To Bag</h4>
                    <h4 className="text-banner-subtitle"></h4>
                </div>
                <Grid className={classes.allCategoryContainer} container spacing={4}>
                    {categoriesList.map((category, index) => {
                        return <Grid key={'id'+index} className={classes.categoryContainer} item xs={2}>
                                <div>
                                    <div>
                                        <img onClick={() => navigateToPage()} className={classes.categoryImage} src={category.src} />
                                        <h4 className={classes.categoryTypeDesc}>{category.type}</h4>
                                    </div>
                                </div>
                            </Grid>
                    })}
                </Grid>
            </Grid>
        </div>
    )
}

CategoriesToBag.defaultProps = {
    categoriesList: [
        {
            type: 'Shirts',
            src: 'http://images2.fanpop.com/image/photos/9000000/more-of-robert-pattinson-photoshoot-twilight-crepusculo-9027126-796-1024.jpg'
        },
        {
            type: 'T-shirts',
            src: 'https://i.pinimg.com/originals/55/5b/68/555b6849a7f84e478ec58eaf1411f792.jpg'
        },
        {
            type: 'Trousers',
            src: 'https://www.thefashionisto.com/wp-content/uploads/2018/05/Henry-Cavill-2018-How-to-Spend-It-Photo-Shoot-007.jpg'
        },
        {
            type: 'Jeans',
            src: 'https://i.pinimg.com/originals/af/73/de/af73deb4423ae76d9b01e5f00070efa0.jpg'
        },
        {
            type: 'Shorts',
            src: 'https://i.pinimg.com/originals/88/0d/9a/880d9a600a13bf50657febbc86bddb29.jpg'
        },
        {
            type: 'Formal Wear',
            src: 'https://i.redd.it/8067kzryxs351.jpg'
        },
        {
            type: 'Jackets',
            src: 'https://live.staticflickr.com/2459/4068284537_334a78cef0_z.jpg'
        },
        {
            type: 'Sarees',
            src: 'https://i.pinimg.com/originals/f3/02/6e/f3026e099351944455f7c104fb27c465.jpg'
        },
        {
            type: 'Suits',
            // src: 'https://www.trendpolice.com/wp-content/uploads/2015/11/hugh-jackman-in-2008.jpg'
            src: 'https://i.weddingomania.com/23-stylish-groom-suits-with-mismatched-prints-8.jpg'
        },
        {
            type: 'Footwear',
            src: 'http://images.scribblelive.com/2015/8/13/609c019c-a115-47b1-8f2c-74e5a8a19b5b_1000.jpg'
        }

    ]
}



export default withRouter(CategoriesToBag)