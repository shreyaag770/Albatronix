import React from 'react'
import Tables from './Tables'
import useStyles from './style'

function Students () {
  const classes = useStyles()
    
  return (
    <div className={classes.container}>
      <Tables />
    </div>
  )
}
export default Students
