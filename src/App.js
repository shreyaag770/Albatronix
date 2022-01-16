/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar } from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert'
import LoginForm from './components/HomePage/LoginForm'
import Students from './components/Students'
import Loader from './components/Loader'
import PrivateRoute from './components/PrivateRoute'
import { alertActions } from './_actions'

import './App.css'

function App () {
  const notification = useSelector((state) => state.notification)
  const loader = useSelector((state) => state.loader)
  // const history = useHistory()
  const dispatch = useDispatch()

  const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />

  const handleCloseNtf = () => {
    dispatch(alertActions.clear())
  }
  return (
    <>

      <div className='App'>

        <Router>
          <Switch>
            <PrivateRoute exact path='/' component={Students} />
          </Switch>
        </Router>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!notification.type}
          autoHideDuration={2000}
          onClose={handleCloseNtf}
        >
          <Alert severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>

      </div>
      <Loader open={loader.run ? loader.run : false} />
    </>

  )
}

export default App
