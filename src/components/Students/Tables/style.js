import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(24)
    }
  },
  table: {
    // minWidth: 1000,
    border: 'none',
    boxShadow: 'none'
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap'
    }
  },
  add: {
    backgroundColor: '#388087',
    color: 'white',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#6fb3b8'
    },
    margin: theme.spacing(2, 1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 1, 2, 0),
      alignSelf: 'left',
      fontSize: '10px',
      fontWeight: 'bold'
    }
  },

  import: {
    backgroundColor: '#388087',
    color: 'white',
    '&:hover': {
      backgroundColor: '#6fb3b8'
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 1, 2, 0),
      alignSelf: 'left',
      backgroundColor: '#388087',
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold'
    }

  },

  export: {
    backgroundColor: '#388087',
    color: 'white',
    textDecorationLine: 'none',
    '&:hover': {
      backgroundColor: '#6fb3b8'
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'bold',
      fontSize: '10px'
    }
  },
  text: {
    marginRight: '10px',
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '15px',
      width: '120px'
    }
  },

  prev: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: '#388087',
    '&:hover': {
      backgroundColor: '#6fb3b8'
    }
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #6fb3b8',
    '&:hover': {
      border: '1px solid #2d676c'
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    flex:1,
    // height: 50,
    [theme.breakpoints.down('xs')]: {
      flex:"1 0 100%",
    }
  },
  searchIcon: {
    marginLeft: 0,
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch'
    }
  },
  delete: {
    cursor: 'pointer',
    margin: theme.spacing(0, 2),
    '&:hover': {
      color: 'red',
      height: 20,
      width: 20
    }
  },
  edit: {
    cursor: 'pointer',
    margin: theme.spacing(0, 2),
    transition: 'height 2s',
    '&:hover': {
      color: '#2d676c'
    }
  },
  share: {
    cursor: 'pointer',
    margin: theme.spacing(0, 2),
    '&:hover': {
      color: '#2d676c',
      height: 20,
      width: 20
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    position: 'sticky',
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'white'
    //  width: '100%'
    }

  },
  oldAdd: {
    // height: 80,
    color: 'white',
    margin: theme.spacing(2, 1),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 1,2,0)
    }
  }
  // sticky: {
  //   position: "sticky",
  //   left: 0,
  //   // background: "white",
  //   boxShadow: "5px 2px 5px grey",
  //   width: '10%',

  // },
  // sticky1: {
  //   position: "sticky",
  //   left: 0,
  //   [theme.breakpoints.down('md')]: {
  //    backgroundColor: 'white',
  //   width: 170
  //   },
  // }
}))
