import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SearchDoctor from './components/SearchDoctor';
import Doctor from './components/Doctor';
import ClinicTimming from './components/ClinicTimmings'

const RouterComponent = () => {
  return (
    <Router>
         <Stack key="root" hideNavBar>
           <Scene key="auth">
             <Scene key="login" component={LoginForm} title="Please Login" />
           </Scene>
           <Scene key="home">
            <Scene key="searchdoctor" component={SearchDoctor} title="Search Doctors" />
            <Scene key="doctor" component={Doctor} title="Doctor Details" />
            <Scene key="clinictimming" component={ClinicTimming} title="Doctor Timming" />
           </Scene>
       </Stack>
    </Router>
  );
};
export default RouterComponent;
