import React from 'react';
import { Button } from "@material-ui/core";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';


class TableProd extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        products: props.prod,
        isLoading: false,
      };
    }

    async handleDeleteProduct(id) {
        this.setState({ isLoading: true });
        await axiosInstance.post('/product/delete', {
          id
        }).then((response) => {
          if(response.data.status) {
            console.log(response.data.message)
            axiosInstance.get('/product/show/all')
                .then((response) => {
                    if (response.status === 200) {
                        const prods = response.data;
                        this.setState({ products: prods, isLoading: false });
                    }
                });
          } else {
            console.log(response.data.message)
          }
        });
        this.setState({ isLoading: false });
      }

    render() {
      const { products } = this.state;
      return (
        <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Designation </th>
                    <th> Prix unitaire($) </th>
                    <th> Quantité </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr>
                      <td> {prod.id} </td>
                      <td> {prod.designation} </td>
                      <td> {prod.prix} </td>
                      <td> {prod.quantite} </td>
                      <td>
                            {/* <Button color="primary">
                                <Edit />
                            </Button> */}
                            <Button style={{ color: 'red' }}>
                                <Delete onClick={() => this.handleDeleteProduct(prod.id)}/>
                            </Button>
                            </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      );
    }
  }
  
  export default TableProd;