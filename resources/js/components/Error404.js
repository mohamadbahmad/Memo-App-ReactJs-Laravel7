

import React from 'react';

import {Link} from "react-router-dom";

class Error404 extends React.Component{


    render()
    {
        return (
            
            <div>
                <h4>404 Page Not Found.<Link to="/">Back to memos page</Link></h4>
            </div>
        );
    }

}

export default Error404;