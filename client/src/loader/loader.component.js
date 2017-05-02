import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

const Loader = () => (
  <div>
    {/*<CircularProgress />*/}
    {/*<CircularProgress size={60} thickness={7} />*/}
    <Paper style={{height: 200, width: 200, backgroundColor: "#eee", position: "absolute", left: "42%", top: "35%", zIndex: 5000}}
    children={
    <CircularProgress size={100} thickness={5} style={{top: "25%", left:"25%"}} />
    } />
  </div>
);

export default Loader;