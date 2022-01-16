import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2d676c',
    alignSelf: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2d676c',
    '&:hover': {
      backgroundColor: '#6fb3b8',
    },
  },
  border: {
    border: '1px solid #6fb3b8',
    padding: theme.spacing(4),
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Pacifico, cursive',
  },
  textField: {
    '& .MuiFormLabel-root': {
      color: '#6fb3b8',
      fontFamily: 'Open Sans Condensed, sans-serif',
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      color: '#6fb3b8',
    },
    '& label.Mui-focused': {
      color: '#2d676c',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#2d676c',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2d676c',
      },
      '&:hover fieldset': {
        borderColor: '#2d676c',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2d676c',
      },
    },
  },
}));
