import React, { Component, useRef } from 'react';
import {
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import { TableClient } from './tableClient';

export class ClientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 0,
      clients: [],
      // allCommandes: [],
      // valueSearch: '',
      sexe: "M",
      isLoading: false,
      isError: false,
      // modalOpen: false,
      // modalConfirm: false
      // modalSuccessOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    startDate: new Date()
  };

  componentDidMount() {
    // bsCustomFileInput.init();
    this.handleLoadClient();
  }

  handleChangeNom(event) {
    this.setState({ nom: event.target.value });
  }

  handleChangePrenom(event) {
    this.setState({ prenom: event.target.value });
  }

  handleChangeSexe(event) {
    console.log("Sexe =====> " + event.target.value);
    this.setState({ sexe: event.target.value });
  }

  handleChangeAdresse(event) {
    this.setState({ adresse: event.target.value });
  }

  handleChangeTel(event) {
    this.setState({ telephone: event.target.value });
  }

  handleChangeDateNais(event) {
    console.log("Date ========> "+event.target.value);
    this.setState({ dateNais: event.target.value });
  }

  async handleSubmit(event) {
    const { nom, prenom, sexe, adresse, telephone, dateNais } = this.state;
    axiosInstance.post('/client/save', {
      nom, prenom, sexe, adresse, telephone, dateNais
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        console.log('Successfully saved');
        this.handleLoadClient();
        // setTimeout(() => {
        //   infoNotification('Command saved succefully');
        // }, 1000);
      } else {
        console.log('Not saved');
      }
    });
    event.preventDefault();
  }

  async handleLoadClient() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/client/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const clients = res.data;
        this.setState({ clients, isLoading: false });
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    } catch (err) {
      console.log('Error =============> ' + err)
      if (err.message.indexOf('401') !== -1) {
        // window.location = '/Login';
        console.log('404 error occured');
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    }
  }

  render() {
    const { clients, isLoading, isError } = this.state;

    if (isLoading) {
      return (
        <div
          style={{
            position: 'absolute',
            left: '60%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress size={50} variant="indeterminate" position="center" />
        </div>
        // <div>Loading users ...</div>
      );
    }

    if (isError) {
      return (
        <div
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: '60%',
            top: '60%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            style={{
              marginTop: '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Error} alt="MyError" width="250" height="250" />
            <Typography variant="h4">Sorry!!! Error occured.</Typography>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Client
          </h3>
          {/* <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>UI Elements</a></li>
              <li className="breadcrumb-item active" aria-current="page">Clients</li>
            </ol>
          </nav> */}
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Client information</h4>
                <form className="form-sample" onSubmit={this.handleSubmit} >
                  <p className="card-description"> Personal info </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nom</label>
                        <div className="col-sm-9">
                        <Form.Control  type="text" onChange={this.handleChangeNom.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Prenom</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={this.handleChangePrenom.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Sexe</label>
                        <div className="col-sm-9">
                          <select className="form-control" onChange={this.handleChangeSexe.bind(this)} >
                            <option value='M'>Masculin</option>
                            <option value='F'>Feminin</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Date de naissance</label>
                        <div className="col-sm-9">
                          <Form.Control type="text" onChange={this.handleChangeDateNais.bind(this)} />
                        </div>
                      </Form.Group>
                      {/* <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Date de naissance</label>
                        <div className="col-sm-9">
                        <DatePicker className="form-control w-100"
                          selected={this.state.dateNais}
                          onChange={this.handleChange}
                        />
                        </div>
                      </Form.Group> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Addresse</label>
                        <div className="col-sm-9">
                          <Form.Control type="text" onChange={this.handleChangeAdresse.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Telephone</label>
                        <div className="col-sm-9">
                          <Form.Control type="text" onChange={this.handleChangeTel.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div></div>
                    <button type="submit" className="btn btn-primary btn-rounded">Enregister le client</button>
                  </div>
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p>
                  <TableClient clients={clients} />
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
    }
}


export default ClientScreen