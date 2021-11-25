import React, { useEffect, useState, useRef } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import axiosInstance from '../../axios';
import TableClientPrint from './table';
import ReactToPrint from 'react-to-print';

export const TableCommand = React.forwardRef((props, ref) => {
    const [commands, setCommands] = useState(props.commands);
    const [isLoading, setLoading] = useState(false);
    const [isPrint, setIsPrint] = useState(false);

    const componentRef = useRef();
    console.log('//////////////////////////////////////////');
    console.log(props);

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
                <TableClientPrint commands={commands} ref={componentRef} isPrint={isPrint}/>
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
