import React from 'react';
import { Button, CircularProgress } from "@material-ui/core";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';


class TableClientPrint extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        clients: props.clients,
        isLoading: false,
        isPrint: props.isPrint,
      };
    }

    async handleDeleteClient(id) {
        this.setState({isLoading: true});
        await axiosInstance.post('/client/delete', {
          id
        }).then((response) => {
          if(response.data.status) {
            console.log(response.data.message)
            axiosInstance.get('/client/show/all')
                .then((response) => {
                    if (response.status === 200) {
                        const clients = response.data;
                        this.setState({ clients, isLoading: false });
                    }
                });
          } else {
            console.log(response.data.message)
          }
        });
        this.setState({ isLoading: false });
      }

    render() {
      const { clients, isPrint, isLoading } = this.state;

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

      return (
        <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th> # </th>
                        <th> Nom </th>
                        <th> Prenom </th>
                        <th> Sexe </th>
                        <th> Date de naissance </th>
                        <th> Telephone </th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((com) => (
                        <tr>
                            <td> {com.id} </td>
                            <td> {com.nom} </td>
                            <td> {com.prenom} </td>
                            <td> {com.sexe} </td>
                            <td> {com.dateNais} </td>
                            <td> {com.telephone} </td>
                            <td>
                            {/* <Button color="primary">
                                <Edit />
                            </Button> */}
                            <Button style={{ color: 'red' }}>
                                <Delete onClick={() => this.handleDeleteClient(com.id)}/>
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
  
  export default TableClientPrint;