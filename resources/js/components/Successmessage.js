
import React from 'react';
function Successmessage(props)
{
    return (

      
        <div className="alert alert-success" role="alert">
            {props.message}
        </div>

    );
}

export default Successmessage;