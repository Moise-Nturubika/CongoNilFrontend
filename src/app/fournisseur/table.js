import React from 'react';
import { Button } from "@material-ui/core";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';


class TableFss extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        fournisseurs: props.fournisseurs,
      };
    }

    render() {
      const { fournisseurs } = this.state;
      return (
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
                        <Button color="primary">
                          <Edit />
                        </Button>
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
      );
    }
  }
  
  export default TableFss;