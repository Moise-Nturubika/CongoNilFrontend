import React, { useRef, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import TableProd from './table';
import ReactToPrint from 'react-to-print';

export const TableProduit = React.forwardRef((props, ref) => {
    const [products, setProducts] = useState(props.prods);
    const [isLoading, setLoading] = useState(false);

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
          <TableProd prod={products} ref={componentRef} />
          <ReactToPrint
            trigger={() => <button className="btn btn-primary btn-rounded">Imprimer</button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
    );
});