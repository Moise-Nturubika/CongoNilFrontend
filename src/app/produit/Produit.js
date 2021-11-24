import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import { ProgressBar } from 'react-bootstrap';
import { CircularProgress, Typography } from '@material-ui/core';
import axiosInstance from '../../axios';
import { TableProduit } from './tableProduit';

export class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 0,
      products: [],
      designation: props.designation,
      prix: props.prix,
      // allCommandes: [],
      // valueSearch: '',
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
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    // bsCustomFileInput.init();
    this.handleLoadProduct();
  }

  handleChangeDesignation(event) {
    this.setState({ designation: event.target.value });
  }

  handleChangePrice(event) {
    this.setState({ prix: event.target.value });
  }

  async handleSubmit(event) {
    const { designation, prix } = this.state;
    // if (this.isUpdate === true) {
    //   axiosInstance.post(`/command/update/${id}`, {
    //     command,
    //     description,
    //   }).then((response) => {
    //     if (response.data.status) {
    //       /* eslint-disable  react/destructuring-assignment */
    //       this.props.setOpenPopup(false);
    //       this.props.function();
    //       setTimeout(() => {
    //         infoNotification('Command updated succefully');
    //       }, 1000);
    //     } else {
    //     }
    //   });
    // } else {
    axiosInstance.post('/product/save', {
      designation,
      prix,
      quantite: 0
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        console.log("Successfully saved")
        this.handleLoadProduct();
        // setTimeout(() => {
        //   infoNotification('Command saved succefully');
        // }, 1000);
      } else {
        console.log('Not saved : ' + response.data );
      }
    });
    // }
    event.preventDefault();
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

  render() {

    const { products, isLoading, isError } = this.state;

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
            Produit
          </h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Product information</h4>
                <form className="form-sample" onSubmit={this.handleSubmit} >
                  {/* <p className="card-description"> Personal info </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Designation</label>
                        <div className="col-sm-9">
                        <Form.Control  type="text" onChange={this.handleChangeDesignation.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Prix unitaire</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={this.handleChangePrice.bind(this)} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div></div>
                    <button type="submit" className="btn btn-primary btn-rounded">Enregister le produit</button>
                  </div>
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p> 
                  <p className="card-description">  </p>
                  {/* <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <button onClick={handlePrint}>Print this out!</button>
                      )}
                    </PrintContextConsumer>
                  </ReactToPrint> */}
                  <TableProduit prods={products} />
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


export default ProductScreen