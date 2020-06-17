import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {CommonRoute, AdminRoute, DoctorRoute, PharmasistRoute} from './PrivateRoute'
import Navbar from "./components/navbar";
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard'
import DoctorsList from "./components/doctorsList";
import PharmasistList from "./components/pharmasistList";
import ApproveUser from "./components/approveUser";
import Prescribe from "./components/prescribe";
import ViewPrescription from "./components/viewPrescription";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route exact path="/" component={Home} />
        <br/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AdminRoute exact path="/doctorslist" component={DoctorsList} />
        <AdminRoute exact path="/pharmasistlist" component={PharmasistList} />
        <AdminRoute exact path="/approveuser" component={ApproveUser} />
        <DoctorRoute exact path="/prescribe" component={Prescribe} />
        <PharmasistRoute exact path="/viewprescription" component={ViewPrescription} />
        <CommonRoute exact path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;