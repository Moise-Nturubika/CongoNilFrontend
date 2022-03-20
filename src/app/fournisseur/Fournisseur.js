import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import { Button } from '@material-ui/core';
import { TableFournisseur } from './tableFournisseur';

export class FournisseurScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fournisseurs: [],
      isLoading: false,
      isError: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleLoadFss();
  }

  handleChangeNom(event) {
    this.setState({ nom: event.target.value });
  }

  handleChangeTel(event) {
    this.setState({ telephone: event.target.value });
  }

  handleChangeMail(event) {
    this.setState({ mail: event.target.value });
  }

  handleChangeSecteur(event) {
    this.setState({ secteur: event.target.value });
  }

  async handleSubmit(event) {
    const { nom, secteur, telephone, mail } = this.state;
    axiosInstance.post('/fournisseur/save', {
      nom, secteur, telephone, mail
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        console.log('Successfully saved');
        this.handleLoadFss();
        // setTimeout(() => {
        //   infoNotification('Command saved succefully');
        // }, 1000);
      } else {
        console.log('Not saved');
      }
    });
    event.preventDefault();
  }

  async handleLoadFss() {
    try {
      console.log('===========================');
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/fournisseur/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const fournisseurs = res.data;
        this.setState({ fournisseurs, isLoading: false });
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
    const { fournisseurs } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Fournisseur
          </h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Fournisseur information</h4>
                <form className="form-sample" onSubmit={this.handleSubmit}>
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
                        <label className="col-sm-3 col-form-label">Téléphone</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={this.handleChangeTel.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Secteur</label>
                        <div className="col-sm-9">
                          <select className="form-control" onChange={this.handleChangeSecteur.bind(this)} >
                            <option>Privée</option>
                            <option>Public</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Adresse mail</label>
                        <div className="col-sm-9">
                          <Form.Control type="text" onChange={this.handleChangeMail.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div></div>
                    <button type="submit" className="btn btn-primary btn-rounded">Enregister le Fournisseur</button>
                  </div>
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p>
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> Nom </th>
                              <th> Téléphone </th>
                              <th> Secteur </th>
                              <th> Adresse mail </th>
                              <th> Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {fournisseurs.map((fss) => (
                              <tr>
                                <td> {fss.id} </td>
                                <td> {fss.nom} </td>
                                <td> {fss.telephone} </td>
                                <td> {fss.secteur} </td>
                                <td> {fss.mail} </td>
                                <td>
                                  {/* <Button color="primary">
                                    <Edit />
                                  </Button> */}
                                  <Button style={{ color: 'red' }}>
                                    <Delete />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                      {/* <TableFss fournisseurs={fournisseurs} ref={componentRef}/> */}
                      {/* <ReactToPrint
                        trigger={() => <button>Print this out!</button>}
                        content={() => componentRef.current}
                      /> */}
                    </div>
                  </div>
                  {/* <TableFournisseur fss={fournisseurs} /> */}
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


export default FournisseurScreen