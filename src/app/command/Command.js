import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Dropdown, } from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';
import Print from '@material-ui/icons/Print';
import axiosInstance from '../../axios';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import logo from './logo.jpg';
import 'jspdf-autotable';
// import { TableCommand } from './tableCommande';

export class CommandScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      products: [],
      panier: [],
      commands: [],
      isLoading: false,
      isError: false,
      adresse: null,
      clientDrop: "Select a client",
      clientSelected: null,
      produitDrop: "Select a product",
      productSelected: null,
      montantTotal: 0,
      qte: 0
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    this.handleLoadClient()
    this.handleLoadProduct()
    this.handleLoadCommand()
  }

  handleChangeClient(client) {
    this.setState({ client: client, clientDrop: client.nom + " " + client.prenom, clientSelected: client });
  }

  handleChangeProduct(prod) {
    this.setState({ produitDrop: prod.designation , productSelected: prod, montantTotal: 0 });
  }

  handleChangeQte(event) {
    const { productSelected } = this.state;
    if(event.target.value != null && event.target.value != "") {
      let mount = parseInt(productSelected.prix) * parseInt(event.target.value);
      this.setState({ montantTotal: mount, qte: event.target.value });
    } else {
      this.setState({ montantTotal: 0, qte: event.target.value });
    }
  }

  handleChangeAdresse(event) {
    this.setState({ adresse: event.target.value });
  }

  handlepdfGenerate() {
    console.log("===> INTO THE PRINT FUNCTION ======");
    var doc = new jsPDF('portrait', 'px', 'A4', 'false');
    doc.addImage(logo, 'JPG', 45, 35, 80, 80);
    doc.setFontSize(18)
    doc.text(340, 50, 'FACTURE');
    doc.setFontSize(11);
    doc.text(35, 130, 'Nord-Kivu, Goma, Q. Des Volcans');
    doc.text(35,140, 'Av. Lumumba, Numero 234');
    doc.text(35,150, '+243 975 236 270');
    // doc.text(260, 180, cmd.client.nom + ' ' + cmd.client.prenom);
    doc.text(260, 180, 'Machin');
    doc.text(260, 190, 'Q. Himbi, Av. De Goma, Numero 265');
    doc.text(260, 200, '+243 975 236 270');
    doc.text(35, 210, 'RefFacture: 90008756');
    doc.text(35, 220, 'Date : 2021-01-12');
    doc.text(35, 230, 'IdClient: 2932');
    doc.autoTable({
      head: [['Produit', 'Prix unitaire($)', 'Quantité', 'Total']],
      body: [
        ['Jibu', '5', '3' , '15'],
        ['Maji Safi', '7', '5' , '35'],
        ['Premidis farine', '24', '3' , '72'],
        ['Maji Safi', '7', '5' , '35'],
      ],
      startY: 250,
    });
    doc.setFontSize(16);
    doc.text(320, 390, 'Total : ');
    doc.text(360, 390, ' 45 $');
    // doc.text(10, 10, 'Salut les conards');
    doc.save('a.pdf');
  }

  handleAddToBasket() {
    const { productSelected, montantTotal, qte } = this.state;
    if(productSelected != null || montantTotal != 0 || qte != 0){
      let pan = {
        'produit': productSelected,
        'refProduit': productSelected.id,
        'montant': montantTotal,
        'qte': qte
      }
      this.setState(prevState => ({
        panier: [...prevState.panier, pan]
      }));
    } else {
      console.log("Cannot insert empty value")
    }
  }

  handleDoSomething() {
    console.log("function do something");
  }

  handleRemoveFromBasket(e) {
    var array = [...this.state.panier]; // make a separate copy of the array
    var index = array.indexOf(e)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({panier: array});
    }
  }

  handleRefresh() {
    console.log('==== REFRESH ====')
    // ReactPDF.render(<Quixote />, `${__dirname}/example.pdf`);
    // ReactPDF.render(<PDFView />, `${__dirname}/example.pdf`);
    // console.log(this.state.panier)
  }

  async handlePrintPDF(cmd) {
    console.log("===> INTO THE PRINT FUNCTION ======");
    var doc = new jsPDF('portrait', 'px', 'A4', 'false');
    doc.addImage(logo, 'JPG', 45, 35, 80, 80);
    doc.setFontSize(18)
    doc.text(340, 50, 'FACTURE');
    doc.setFontSize(11);
    doc.text(35, 130, 'Nord-Kivu, Goma, Q. Des Volcans');
    doc.text(35,140, 'Av. Lumumba, Numero 234');
    doc.text(35,150, '+243 975 236 270');
    doc.text(260, 180, cmd.client.nom + ' ' + cmd.client.prenom);
    // doc.text(260, 180, 'Machin');
    doc.text(260, 190, cmd.livraison);
    doc.text(260, 200, cmd.client.telephone);
    doc.text(35, 210, 'RefFacture: ' + cmd.id);
    doc.text(35, 220, 'Date : ' + cmd.dateCommande);
    doc.text(35, 230, 'IdClient: ' + cmd.client.id);
    doc.autoTable({
      head: [['Produit', 'Prix unitaire($)', 'Quantité', 'Total']],
      body: 
        cmd.details.map((dtl)=> (
          [
            dtl.produit.designation,
            dtl.qte,
            dtl.produit.prix,
            dtl.montant
          ]
        )),
        // ['Jibu', '5', '3' , '15'],
        // ['Maji Safi', '7', '5' , '35'],
        // ['Premidis farine', '24', '3' , '72'],
        // ['Maji Safi', '7', '5' , '35'],
      startY: 250,
    });
    doc.setFontSize(16);
    doc.text(320, 390, 'Total : ');
    doc.text(360, 390, cmd.total + '  $');
    // doc.text(10, 10, 'Salut les conards');
    doc.save(cmd.client.nom + cmd.id +'.pdf');
  }

  async handleLoadClient() {
    try {
      console.log('===========================');
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

  async handleLoadCommand() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/command/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const commands = res.data;
        this.setState({ commands, isLoading: false });
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

  async handleSaveCommand() {
    const { adresse, clientSelected, panier } = this.state;
    axiosInstance.post('/command/save', {
      command: {
        livraison: adresse,
        refClient: clientSelected.id
      },
      details: panier
      // nom, prenom, sexe, adresse, telephone, dateNais
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        console.log('Successfully saved');
        this.setState({
          adresse: null,
          panier: [],
          clientDrop: "Select a client",
          produitDrop: "Select a product",
          clientSelected: null,
          productSelected: null,
          montantTotal: 0,
          qte: 0
        });
        this.handleLoadCommand();
        // setTimeout(() => {
        //   infoNotification('Command saved succefully');
        // }, 1000);
      } else {
        console.log('Not saved');
      }
    });
  }

  async handleDeleteCommand(id) {
    axiosInstance.post('/command/delete', {
      id
    }).then((response) => {
      if(response.data.status) {
        console.log(response.data.message)
        this.setState({
          adresse: null,
          panier: [],
          clientDrop: "Select a client",
          produitDrop: "Select a product",
          clientSelected: null,
          productSelected: null,
          montantTotal: 0,
          qte: 0
        });
        this.handleLoadCommand();
      } else {
        console.log(response.data.message)
      }
    });
  }

  render() {
    const {
      clients,
      commands,
      isLoading,
      isError,
      clientDrop,
      products,
      produitDrop,
      productSelected,
      montantTotal,
      panier
    } = this.state;

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
            Command
          </h3>
          {/* <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>UI Elements</a></li>
              <li className="breadcrumb-item active" aria-current="page">Commands</li>
            </ol>
          </nav> */}
        </div>
        <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Produit</h4>
                <form className="forms-sample">
                <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <label htmlFor="exampleInputUsername1">Client</label>
                        <Dropdown className="form-control">
                          <Dropdown.Toggle variant="btn btn-outline-secondary" id="dropdownMenuOutlineButton2">
                            {clientDrop}
                          </Dropdown.Toggle>
                          <Dropdown.Menu onChange={this.handleChangeClient.bind(this)}>
                            {clients.map((com) => (
                              <Dropdown.Item onClick={() => this.handleChangeClient(com)}>{com.nom} {com.prenom}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <label htmlFor="exampleInputUsername1">Produit</label>
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
                  <Form.Group>
                    <label htmlFor="exampleInputPassword1">Livraison</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Adresse de livraison"
                      onChange={this.handleChangeAdresse.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputEmail1">Prix unitaire</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="PU"
                      value={(productSelected == null) ? "" : productSelected.prix} />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputPassword1">Quantité</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Quantite"
                      onChange={this.handleChangeQte.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputConfirmPassword1">Total</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Montant total" 
                      value={montantTotal}
                    />
                  </Form.Group>
                  <button type="button" className="btn btn-primary mr-2" onClick={this.handleAddToBasket.bind(this)}>Ajouter au panier</button>
                  {/* <button type="button" className="btn btn-primary mr-2" onClick={this.handlepdfGenerate}>Download</button> */}
                  {/* <button className="btn btn-light">Cancel</button> */}
                  {/* <TableComponent ref={(response) => (this.componentRef = response)} /> */}
                  {/* <ReactToPrint
                      content={() => this.componentRef}
                      trigger={() => <button type="button" className="btn btn-primary mr-2">Print</button>}
                  /> */}
                </form>
              </div>
            </div>
          </div>
        <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Panier</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Produit</th>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {panier.map((elmt) => (
                        <tr>
                          <td>{elmt.produit.id}</td>
                          <td>{elmt.produit.designation}</td>
                          <td>{elmt.produit.prix}</td>
                          <td>{elmt.qte}</td>
                          <td>{elmt.montant} $</td>
                          <td>
                            <Button style={{ color: 'red' }} onClick={() => this.handleRemoveFromBasket(elmt)}>
                              <Delete />
                            </Button>
                          </td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <Form.Group>
                    {
                      (panier.length > 0) ?
                      <button
                        type="button"
                        className="btn btn-primary mr-2"
                        onClick={() => this.handleSaveCommand()}
                      >
                        Enregistrer la commande
                      </button> :
                      <p></p>
                    }
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
            <div className="card-body">
          <h4 className="card-title">Command list</h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> # </th>
                  <th> Client </th>
                  <th> Date commande </th>
                  <th> Nbre produit </th>
                  <th> Montant total </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd) => (
                  <tr>
                    <td> {cmd.id} </td>
                      <td> {cmd.client.nom} {cmd.client.prenom}</td>
                    <td>
                      {cmd.dateCommande}
                    </td>
                    <td> {cmd.countProduit} </td>
                    <td> {cmd.total} $ </td>
                    <td>
                      <Button color="primary" onClick={() => this.handlePrintPDF(cmd)}>
                        <Print />
                      </Button>
                      <Button style={{ color: 'red' }} onClick={() => this.handleDeleteCommand(cmd.id)}>
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
              {/* <TableCommand commands={commands} isLoading={isLoading}/> */}
            </div>
          </div>
      </div>
    );
    }
}


export default CommandScreen