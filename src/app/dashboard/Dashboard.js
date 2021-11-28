import React, { Component } from 'react';
import Logo from './logo.jpg';
// import { Line, Doughnut, Bar, Radar } from 'react-chartjs-2';
import { Line, Bar, Radar } from 'react-chartjs-2';

import { ProgressBar, Dropdown } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';
import { VectorMap } from "react-jvectormap";
import { Typography } from '@material-ui/core';

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Accueil</h4>
            </div>
            <div
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                left: '50%',
                top: '400%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div
                style={{
                  marginTop: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={Logo} alt="MyError" width="250" height="250" />
              </div>
            </div>
          </div>
        </div>        
      </div> 
    );
  }
}
export default Dashboard;