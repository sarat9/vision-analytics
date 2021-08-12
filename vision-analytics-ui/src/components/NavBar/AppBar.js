import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { withRouter } from 'react-router-dom'
import SubCategoryDropDown from './SubCategoryDropDown'
import './AppBar.css'

const drawerWidth = 240

const dropdownData = {
  menMenuCategory: {
    'Top Wear': [{ name: 'T-Shirts' }, { name: 'Casual Shirts' }, { name: 'Formal Shirts' }, { name: 'Jackets' }],
    'Indian Wear': [{ name: 'Kurtas' }, { name: 'Sherwanis' }, { name: 'Dhotis' }, { name: 'Ethnic Shirts' }],
    'Bottom Wear': [{ name: 'Jeans' }, { name: 'Casual Wear' }, { name: 'Formal' }],
    'Foot Wear': [{ name: 'Funky Shoes' }, { name: 'Casual Shoes' }, { name: 'Formal Shoes' }, { name: 'Sneakers' }],
    'Sun Glasses': [{ name: 'Aviator' }, { name: 'Cooling Glasse' }],
    'Gadgets': [{ name: 'Smart Wearables' }, { name: 'Head Phones' }, { name: 'Speakers' },],
  },
  womenMenuCategory: {
    'Top Wear': [{ name: 'T-Shirts' }, { name: 'Casual Shirts' }, { name: 'Formal Shirts' }, { name: 'Jackets' }],
    'Indian Wear': [{ name: 'Kurtas' }, { name: 'Sherwanis' }, { name: 'Dhotis' }, { name: 'Ethnic Shirts' }],
    'Bottom Wear': [{ name: 'Jeans' }, { name: 'Casual Wear' }, { name: 'Formal' }],
    'Foot Wear': [{ name: 'Funky Shoes' }, { name: 'Casual Shoes' }, { name: 'Formal Shoes' }, { name: 'Sneakers' }],
  },
  kidsMenuCategory: {
    'Top Wear': [{ name: 'T-Shirts' }, { name: 'Casual Shirts' }, { name: 'Formal Shirts' }, { name: 'Jackets' }],
    'Indian Wear': [{ name: 'Kurtas' }, { name: 'Sherwanis' }, { name: 'Dhotis' }, { name: 'Ethnic Shirts' }],
    'Bottom Wear': [{ name: 'Jeans' }, { name: 'Casual Wear' }, { name: 'Formal' }],
    'Foot Wear': [{ name: 'Funky Shoes' }, { name: 'Casual Shoes' }, { name: 'Formal Shoes' }, { name: 'Sneakers' }],
  },
  homeLivingMenuCategory: {
    'Top Wear': [{ name: 'T-Shirts' }, { name: 'Casual Shirts' }, { name: 'Formal Shirts' }, { name: 'Jackets' }],
    'Indian Wear': [{ name: 'Kurtas' }, { name: 'Sherwanis' }, { name: 'Dhotis' }, { name: 'Ethnic Shirts' }],
    'Bottom Wear': [{ name: 'Jeans' }, { name: 'Casual Wear' }, { name: 'Formal' }],
    'Foot Wear': [{ name: 'Funky Shoes' }, { name: 'Casual Shoes' }, { name: 'Formal Shoes' }, { name: 'Sneakers' }],
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  search: {
    position: 'absolute',
    right: '5%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  websiteTitle: {
    fontSize: '1.8em',
    fontWeight: '700',
  },
  categories: {
    width: '50%',
    display: 'flex',
    margin: '0% 4%'
  },
  menuCategory: {
    margin: '1%',
    textTransform: 'uppercase',
    fontSize: '1.1em',
    fontWeight: '300',
    paddingBottom: '3px',
    paddingTop: '5px',
    borderBottom: '2px solid pink',
    '&:hover': {
      fontWeight: '300',
      borderBottom: '4px solid white',
      height: '100%',
      cursor: 'pointer',
    }
  },
  subMenuDropDown: {
    zIndex: 999999999,
    position: 'fixed',
    top: '0px',
    left: '5vw',
    height: '60%',
    width: '70%',
    background: '#151412',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }

}))


function MyAppBar(props) {
  const classes = useStyles()
  const theme = useTheme()
  const { open, handleDrawerOpen, handleDrawerClose, toggleDrawer } = props

  const routeToLink = (linkURL) => {
    props.history.push(linkURL)
  }

  return (
    <div className="app-bar-component">
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        style={{
          background: '#9c27b0',
          zIndex: 99999999999999999999
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography onClick={()=>routeToLink('/')} className={classes.websiteTitle} variant='h6' noWrap>
            Vision Analytics
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(MyAppBar)