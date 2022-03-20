import React, { Component } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import { Button } from '@material-ui/core';
// import { TableFournisseur } from './tableFournisseur';

export class ApprovScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvs: [],
      fournisseurs: [],
      fssDrop: "Select a fournissor",
      fssSelected: null,
      products: [],
      isLoading: false,
      isError: false,
      produitDrop: "Select a product",
      productSelected: null,
      qte: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleLoadFss();
    this.handleLoadProduct();
    this.handleLoadApprov();
  }

  handleChangeProduct(prod) {
    this.setState({ produitDrop: prod.designation , productSelected: prod });
  }

  handleChangeFss(fss) {
    this.setState({ fssDrop: fss.nom , fssSelected: fss });
  }

  handleChangeQte(event) {
    this.setState({ qte: event.target.value });
  }

  async handleLoadProduct() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/product/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const products = res.data;
        this.setState({ products, isLoading: false });
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

  async handleSubmit(event) {
    const { productSelected, fssSelected, qte } = this.state;
    axiosInstance.post('/approv/save', {
      quantite: qte,
      refFss: fssSelected.id,
      refProduit: productSelected.id
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        console.log('Successfully saved');
        this.handleLoadApprov();
      } else {
        console.log('Not saved');
      }
    });
    event.preventDefault();
  }

  async handleLoadFss() {
    try {
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

  async handleLoadApprov() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/approv/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const approvs = res.data;
        this.setState({ approvs, isLoading: false });
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
    const { approvs, products, produitDrop, fournisseurs, fssDrop } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Approvisionnement
          </h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">All informations</h4>
                <form className="form-sample" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Fournisseur</label>
                        <Dropdown className="form-control">
                          <Dropdown.Toggle variant="btn btn-outline-secondary" id="dropdownMenuOutlineButton2">
                            {fssDrop}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {fournisseurs.map((com) => (
                              <Dropdown.Item onClick={() => this.handleChangeFss(com)}>{com.nom}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Produit</label>
                        <Dropdown className="form-control">
                          <Dropdown.Toggle variant="btn btn-outline-secondary" id="dropdownMenuOutlineButton2">
                            {produitDrop}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {products.map((prod) => (
                              <Dropdown.Item onClick={() => this.handleChangeProduct(prod)}>{prod.designation}</Dropdown.Item>
                            ))
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                      <label htmlFor="exampleInputPassword1">Quantité</label>
                        <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Quantite"
                        onChange={this.handleChangeQte.bind(this)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div></div>
                    <button type="submit" className="btn btn-primary btn-rounded">Enregister</button>
                  </div>
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p>
                  <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Approvisionnement list</h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th> # </th>
                              <th> Fournisseur </th>
                              <th> Date Approv. </th>
                              <th> Produit </th>
                              <th> Quantite </th>
                              <th> Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {approvs.map((app) => (
                              <tr>
                                <td> {app.id} </td>
                                  <td> {app.fournisseur.nom} </td>
                                <td>
                                  {app.dateApprov}
                                </td>
                                <td> {app.produit.designation} </td>
                                <td> {app.quantite} </td>
                                <td>
                                  <Button style={{ color: 'red' }}>
                                    <Delete />
                                  </Button>
                                </td>
                              </tr>
                            ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
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


export default ApprovScreen