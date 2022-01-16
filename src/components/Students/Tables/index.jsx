import React, { useEffect, useState } from 'react'
import { withStyles,  makeStyles, useTheme } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, InputBase, Fab, Paper, Button, Typography } from '@material-ui/core'
import { DeleteOutline as DeleteOutlineIcon, EditOutlined as EditOutlinedIcon, Add as AddIcon, Search as SearchIcon } from '@material-ui/icons'
import ReactExport from 'react-export-excel'
import useStyles from './style'
import { withAuth } from '../../../utils/axios'
import { alertActions, loaderActions } from '../../../_actions'
import { useDispatch } from 'react-redux'
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'




const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
// import MenuItem from '@material-ui/core/MenuItem'

const currencies = [

  {
    value: '5',
    label: '5'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '15',
    label: '15'
  },
  {
    value: '20',
    label: '20'
  },
  {
    value: '25',
    label: '25'
  }

]
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#6fb3b8',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'white'
    }
  }
}))(TableRow)

function createData (name, height, mass, hair_color, skin_color, eye_color,birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url) {
  return {

    name, height, mass, hair_color, skin_color, eye_color,birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url
  }
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function Tables () {
  const classes = useStyles()
  const initialStudent = {
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles:[],
    starships:[],
    created: '',
    edited: '',
    url: '',

  }

  const initialFacData = { email: '', no: '' }

  var [studentData, setStudentData] = useState(initialStudent)
  const [facilitatorData, setFacilitatorData] = useState(initialFacData)
  const [students, setStudents] = useState([])
  // const [page, setPage] = useState(-1)
  // const [rowsPerPage, setRows] = useState(5)
  const [keys, setKeys] = useState([])
  const [modalOpen, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [alert, setAlert] = useState(false)
  const [searchTxt, setTxt] = useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  var [titles, setTitles] = React.useState([]);
  var[species,setSpecies] = React.useState([]);
  var [vehicles,setVehicles] = React.useState([]);
  var [starships,setStarships] = React.useState([]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value));
    
  };
  const dispatch = useDispatch()
  const getStudents = async (direction, other, reset) => {
    console.log(direction, other, reset)
    try {
      let key = keys[other ? page - 1 : page]
      if (direction && direction === 'prev' && page - 1 >= 0 && page !== 0) {
        key = page - 1 === 0 ? undefined : keys[page - 2]
      }
      if (reset) {
        key = undefined
      }
      if (!(!key && direction === 'next')) {
        console.log('key', key)
        dispatch(loaderActions.run())

        const { data} = await withAuth(`/`)
        console.log(data);

        axios.get('https://swapi.py4e.com/api/people').then( async (data) => {
          console.log(data);
          console.log(data.data.results);
          for (var u in data.data.results) {
            var tt = [];
            for (var f in data.data.results[u].films) {
              await axios.get(data.data.results[u].films[f]).then((result) => {
                console.log(result.data);
                console.log(tt);
                tt = [...tt, result.data.title];
                 setTitles(tt);
                //use titles here
              });
            }
            var ss = [];
            for (var f in data.data.results[u].species) {
              await axios.get(data.data.results[u].species[f]).then((result) => {
                ss = [...ss, result.data.name];
                setSpecies(ss);
              });
            }

            var vv = [];
            for (var f in data.data.results[u].vehicles) {
              await axios.get(data.data.results[u].vehicles[f]).then((result) => {
                vv = [...vv, result.data.name];
                setVehicles(vv);
              });
            }
            var sss = [];
            for (var f in data.data.results[u].starships) {
              await axios.get(data.data.results[u].starships[f]).then((result) => {
                console.log(sss);
                sss = [...sss, result.data.name];
                setStarships(sss);
              });
            }
            console.log(sss);
            console.log("films", tt);
           studentData = data.data.results.map( (el) => 
          createData(el.name, el.height, el.mass, el.hair_color, el.skin_color, el.eye_color, el.birth_year, el.gender, el.homeworld, tt, ss,vv,sss,el.created, el.edited,el.url)

        )

        dispatch(loaderActions.stop())
        console.log('studentData', studentData)
          }
          setStudents(studentData)
        });
       
        if (studentData.length) {
          if (direction !== 'prev' && !other && data.key) {
            const isKeyExist = keys.filter((el) => el === data.key.studentId)
            if (!isKeyExist.length) {
              const keysCopy = reset ? [] : [...keys]
              setKeys([...keysCopy, data.key.studentId])
              console.log('keys', [...keysCopy, data.key.studentId])
            }
          }
          if (!other) {
            let newpage = !direction || direction === 'next' ? page + 1 : page - 1
            if (reset) {
              newpage = 0
            }
            // setPage(newpage)
            console.log('pageno', newpage)
          }
         
          console.log(students);
        }
      }
    } catch (error) {
      dispatch(loaderActions.stop())
      console.log(error)
    }
  }
  const searchStudents = async (value) => {
    try {
      if (!value) {
        getStudents(undefined, false, true)
      } else {
        dispatch(loaderActions.run())
        const { data } = await withAuth(`/?search=${value}`)
        console.log(data);
        dispatch(loaderActions.stop())
        const studentData = data.results.map((el) => createData(el.name, el.height, el.mass, el.hair_color, el.skin_color, el.eye_color, el.birth_year,el.gender,el.homeworld,el.films,el.species,el.vehicles, el.starships,el.created,el.edited,el.url));
        setStudents(studentData);
        console.log(studentData);
      }
      setTxt(value)
    } catch (error) {
      dispatch(loaderActions.stop())
    }
  }

 

  const sortData = async () => {
    try {
      dispatch(loaderActions.run())
      students.sort(function (a, b) {
        return a.name.localeCompare(b.name); //using String.prototype.localCompare()
      });

      setStudents(students);
        dispatch(loaderActions.stop())
    } catch (error) {
      dispatch(loaderActions.stop())
      console.log(error)
    }
  }
  useEffect(() => {
    getStudents()
  }, [rowsPerPage]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className={classes.icons} style={{marginBottom: "2%"}}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => searchStudents(e.target.value)}
          />
        </div>

          <Button variant='raised' component='span' color='primary' className={classes.import} onClick={sortData}>
            Sort Table
          </Button>
      </div>
     
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.sticky} style={{ minWidth: 170, fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>Full Name</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700",fontSize: "15px"}}>Height</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif",fontWeight: "700", fontSize: "15px"}}>Mass</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '40%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px" }}>Hair Color</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px" }}>Skin Color</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>Eye Color</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>Birth Year</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px" }}>Gender</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px" }}>Homeworld</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px" }}>Films</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>Species</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%',fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px" }}>Vehicles</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>Starships</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>created</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>edited</StyledTableCell>
              <StyledTableCell align='left' style={{ width: '20%' ,fontFamily: "Titillium Web, sans-serif" , fontWeight: "700", fontSize: "15px"}}>URL</StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>

            {
            (rowsPerPage > 0
              ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : students
            ).map((row,index) => (
              <StyledTableRow key={row.studentId}>
                <StyledTableCell component='th' scope='row' className={classes.sticky1}  style={{ fontFamily: "Titillium Web, sans-serif", fontWeight: "600" }}>
                {row.species == "Human" ? <FontAwesomeIcon icon={faUser} style={{marginRight: "6%", color: "#388087"}}/>: row.species == "Droid" ? <FontAwesomeIcon icon={faUser} style={{marginRight: "6%", color: "#388087"}}/> : <FontAwesomeIcon icon={faUser} style={{marginRight: "6%", color: "#388087"}}/>  }
                {row.name}
                
                </StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%', fontFamily: "Titillium Web, sans-serif" }}>{row.height}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.mass}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '30%',fontFamily: "Titillium Web, sans-serif"  }}>{row.hair_color}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>
                  {row.skin_color}
                </StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.eye_color}</StyledTableCell>
        
                <StyledTableCell align='left' style={{ width: '5%' ,fontFamily: "Titillium Web, sans-serif" }}>{row.birth_year}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%' ,fontFamily: "Titillium Web, sans-serif" }}>{row.gender}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.homeworld}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.films[index]}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.species}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.vehicles}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.starships[index]}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.created}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%',fontFamily: "Titillium Web, sans-serif"  }}>{row.edited}</StyledTableCell>
                <StyledTableCell align='left' style={{ width: '5%' ,fontFamily: "Titillium Web, sans-serif" }}>{row.url}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter style={{ width: '40%' }}>
            <TableRow style={{ position: 'sticky' }}>
             
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
