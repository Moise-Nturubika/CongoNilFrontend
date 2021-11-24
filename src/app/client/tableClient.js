import React, { useEffect, useState, useRef } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import TableClientPrint from './table';
import ReactToPrint from 'react-to-print';

// const TableClient = (props) => {
//     const [clients, setClients] = useState(props.clients);

//     return(
//         <div className="col-lg-12 grid-margin stretch-card">
//             <div className="card">
//                 <div className="card-body">
//                 <div className="table-responsive">
//                     <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                         <th> # </th>
//                         <th> Nom </th>
//                         <th> Prenom </th>
//                         <th> Sexe </th>
//                         <th> Date de naissance </th>
//                         <th> Telephone </th>
//                         <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {clients.map((com) => (
//                         <tr>
//                             <td> {com.id} </td>
//                             <td> {com.nom} </td>
//                             <td> {com.prenom} </td>
//                             <td> {com.sexe} </td>
//                             <td> {com.dateNais} </td>
//                             <td> {com.telephone} </td>
//                             <td>
//                             <Button color="primary">
//                                 <Edit />
//                             </Button>
//                             <Button style={{ color: 'red' }}>
//                                 <Delete />
//                             </Button>
//                             </td>
//                         </tr>
//                         ))}
//                     </tbody>
//                     </table>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export const TableClient = React.forwardRef((props, ref) => {
    const [clients, setClients] = useState(props.clients);
    const [isLoading, setLoading] = useState(false);
    const [isPrint, setIsPrint] = useState(false);

    const componentRef = useRef();

    return(
        (isLoading === true) ?
        <div
          style={{
            position: 'absolute',
            left: '60%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress size={50} variant="indeterminate" position="center" />
        </div> :
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <TableClientPrint clients={clients} ref={componentRef} isPrint={isPrint}/>
                <ReactToPrint
                  trigger={() => <button className="btn btn-primary btn-rounded">Imprimer</button>}
                  content={() => {
                    if(isPrint === true) {
                      console.log("IsPrintState changed ====> " + isPrint + " to ====> " + !isPrint);
                      setIsPrint(false);
                    } else {
                      console.log("IsPrintState changed ====> " + isPrint + " to ====> " + !isPrint);
                      setIsPrint(true);
                    }
                    return componentRef.current
                  }}
                />
            </div>
        </div>
    );
});

// export default TableClient;
