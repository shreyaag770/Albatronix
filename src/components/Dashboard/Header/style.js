/* eslint-disable quotes */
import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#388087",
    position: 'sticky',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#388087",
    fontFamily: 'Signika, sans-serif',
    fontWeight: 700,
  },
  appBar: {
    backgroundColor: "transparent",
    color: "#388087",
    boxShadow: "0px 15px 15px -15px #388087"
  },
}));
