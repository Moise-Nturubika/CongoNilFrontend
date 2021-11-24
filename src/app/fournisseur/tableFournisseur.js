import React, { useEffect, useState, useRef } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import TableFss from './table';

export const TableFournisseur = React.forwardRef((props, ref) => {
    const [fournisseurs, setFournisseurs] = useState(props.fss);
    const [isLoading, setLoading] = useState(false);

    // const componentUseR = useRef();
    // const PrintSelect = useReactToPrint({
    //   content: () => componentUseR.current,
    // });

    const componentRef = useRef();

    function handleDeleteFournisseur(id) {
        setLoading(true);
        axiosInstance.post('/fournisseur/delete', {
          id
        }).then((response) => {
          if(response.data.status) {
            console.log(response.data.message)
            setFournisseurs([]);
            axiosInstance.get('/fournisseur/show/all')
                .then((response) => {
                    if (response.status === 200) {
                        const fss = response.data;
                        setFournisseurs(fss);
                        setLoading(false);
                    }
                });
          } else {
            console.log(response.data.message)
          }
        });
        setLoading(false);
      }

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
          <TableFss fournisseurs={fournisseurs} ref={componentRef}/>
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
    );
});