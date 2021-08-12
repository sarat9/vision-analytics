import React from 'react'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {
    padding: '5% 3%'
  },
  subMenuofSelectedCategory: {
    columnWidth: '200px',
    columnCount: 4,
    columnGap: '20px'
  },
  subMenuItemHeading: {
    fontSize: '15px',
    padding: '0px',
    margin: '10px 0px',
    color: '#9c27b0'
  },
  subMenuItem: {
    fontSize: '16px',
    fontFamily: 'cursive',
    padding: '0px',
    margin: '0px',
    color: 'ghostwhite',
    cursor: 'pointer',
    '&:hover': {
      color: 'aquamarine'
    },
  }
  
}))


function SubCategoryDropDown(props) {
  const classes = useStyles()
  const { dropdowns } = props

  const routeToLink = (linkURL) => {
    props.history.push(linkURL)
  }

  return (
    <div className={classes.root}>
      <br /> <br /> <br />

      <div id="subMenuofSelectedCategoryId" className={classes.subMenuofSelectedCategory}>
        {dropdowns && Object.keys(dropdowns).map((itemType) => {
          return <>
            <h4 className={classes.subMenuItemHeading}>{itemType}</h4>
            {dropdowns[itemType] && (dropdowns[itemType]).map((item) => {
              return (<>
                <p className={classes.subMenuItem}>{item.name}</p>
              </>)
            })}
          </>
        })}
      </div>
    </div>
  )
}

export default withRouter(SubCategoryDropDown)