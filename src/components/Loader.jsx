import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    },
    alignItems: 'center',
    justifyContent: 'center'
    // marginTop: '20%',
  },
  backdrop: {
    zIndex: 9999,
    color: '#fff'
  }
}))

export default function Loader (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress style={{ color: 'white' }} />
      </Backdrop>

    </div>
  )
}
