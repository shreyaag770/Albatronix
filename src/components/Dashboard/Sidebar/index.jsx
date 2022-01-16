import React from 'react'
import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Header from '../Header'
import useStyles from './style'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import clsx from 'clsx'

function ResponsiveDrawer (props) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(mobileOpen => !mobileOpen)
  }
  const drawer = (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
        </IconButton>
      </div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[{ text: "People's Data", route: '' }].map((data, index) => (
          <Link to={`/${data.route}`} style={{ textDecoration: 'none', color: 'white' }}>
            <ListItem button key={data.text} style={{ fontFamily: 'Signika, sans-serif', fontWeight: 700 }}>
              <Divider />
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon style={{ color: 'white' }} /> : <MailIcon style={{ color: 'white' }} />}</ListItemIcon>
              <ListItemText primary={data.text} style={{ fontFamily: 'Signika, sans-serif', fontWeight: 700 }} />
            </ListItem>
          </Link>

        ))}
      </List>
    </>
  )
  return (
    <>
      <div className={clsx(classes.headerBar, {
        [classes.headerBarShift]: mobileOpen
      })}
      >
        <Header handleDrawerToggle={handleDrawerToggle} open={mobileOpen} />
      </div>
      {/* The implementation can be swapped with js to avoid SEO duplication of links.  */}
      <Hidden only={['xs']}>
        <Drawer
          variant='persistent'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >

          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          classes={{
            paper: classes.drawerPaper
          }}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >

          {drawer}
        </Drawer>
      </Hidden>
      <div className={clsx(classes.content, {
        [classes.contentShift]: mobileOpen
      })}
      >
        {props.children}
      </div>

    </>
  )
}

export default ResponsiveDrawer
