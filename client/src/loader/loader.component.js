import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loader = () => (
  <div>
    {/*<CircularProgress />*/}
    {/*<CircularProgress size={60} thickness={7} />*/}
    <CircularProgress size={100} thickness={5} style={{position: "absolute", left: "45%", top: "45%"}} />
  </div>
);

export default Loader;