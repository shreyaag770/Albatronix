import React from 'react'
import {
  AppBar, Toolbar, Typography, IconButton, MenuItem, Menu
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import useStyles from './style'

const AccountIcon = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const MenuHandler = (event) => {
    if (anchorEl == null) setAnchorEl(event.currentTarget)
    else setAnchorEl(null)
  }
  return (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={MenuHandler}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!props.AnythingElseOpened && anchorEl != null}
        onClose={MenuHandler}
        style={{ marginTop: '40px' }}
      >
       
      </Menu>
    </div>
  )
}
export default function Header ({
  handleDrawerToggle, open
}) {
  const classes = useStyles()
  const history = useHistory()

  async function signOut () {
    try {
      localStorage.removeItem('token')
      history.push('/')
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='sticky' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' className={classes.title}>
            Admin Dashboard
          </Typography>
          <AccountIcon signOutHandler={signOut} AnythingElseOpened={open} />
        </Toolbar>

      </AppBar>
    </div>
  )
}
