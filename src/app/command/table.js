import React from 'react';
import { Button, CircularProgress } from "@material-ui/core";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';


class TableCmdPrint extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        clients: props.commands,
        isLoading: false,
        isPrint: props.isPrint,
      };

      console.log('//////////////////////////////////////////');
      console.log(props);
    }

    async handleDeleteCmd(id) {
      this.setState({isLoading: true});
      await axiosInstance.post('/command/delete', {
        id
      }).then((response) => {
        if(response.data.status) {
          console.log(response.data.message)
          axiosInstance.get('/command/show/all')
            .then((response) => {
              if (response.status === 200) {
                const commands = response.data;
                this.setState({ commands, isLoading: false });
              }
            }
          );
        } else {
          console.log(response.data.message)
        }
      });
      this.setState({ isLoading: false });
    }
    
    render() {
      const { commands, isPrint, isLoading } = this.state;

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