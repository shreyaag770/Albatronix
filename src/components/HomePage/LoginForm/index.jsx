import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Avatar, Button, CssBaseline, TextField, Typography, Container
} from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { alertActions, loaderActions } from '../../../_actions'
import { withoutAuth } from '../../../utils/axios'

import useStyles from './styles'

export default function SignIn () {
  const [authData, setAuthData] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const history = useHistory()

  async function signIn (e) {
    e.preventDefault()
    try {
      const { email, password } = authData
      if (!email || !password) {
        dispatch(alertActions.error('Invalid Data'))
      } else {
        dispatch(loaderActions.run())
        const { data } = await withoutAuth.post('admin/login', authData)
        dispatch(loaderActions.stop())
        window.localStorage.setItem('token', data.token)
        history.push('/student')
      }
    } catch (error) {
      dispatch(loaderActions.stop())
      console.log('error', error.response)
      let msg = 'Cannot Login'
      if (error.response) {
        msg = error.response.data.message
      }
      dispatch(alertActions.error(msg))
    }
  }

  function handleSignInData (e) {
    const { name, value } = e.target
    setAuthData({ ...authData, [name]: value })
  }

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.border}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' style={{ fontFamily: 'Pacifico, cursive' }}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Addresss'
              name='email'
              autoComplete='email'
              autoFocus
              className={classes.textField}
              onChange={handleSignInData}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              className={classes.textField}
              onChange={handleSignInData}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={signIn}
            >
              Sign In
            </Button>
          </form>
        </div>

      </div>
    </Container>
  )
}
