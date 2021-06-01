
import React from 'react';

function Errormessage(props)
{
    return (

      
        <div className="alert alert-danger" role="alert">
            {props.message}
        </div>

    );
}

export default Errormessage;