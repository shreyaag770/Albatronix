import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withAuth } from '../../utils/axios'
import Dashboard from '../Dashboard'

const PrivateRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const { component: Component, ...rest } = props

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await withAuth.get('/')
  //       setIsAuthenticated(true)
  //     } catch (err) {
  //       setIsAuthenticated(false)
  //     }
  //   }
  //   fetchData()
  // }, [])
  const renderComponent = (isAuthenticated) => {
    let component = null
    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        component = <Dashboard><Component {...props} /></Dashboard>
      } else {
        component = <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }
    }
    return component
  }

  return (
    <Route
      {...rest}
      render={() => renderComponent(isAuthenticated)}
    />
  )
}

export default PrivateRoute
