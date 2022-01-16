import ResponsiveDrawer from "./Sidebar/index"
function Dashboard (props) {
  
  return (
      <ResponsiveDrawer>
        {props.children}
      </ResponsiveDrawer>
    
  );
}
export default Dashboard
