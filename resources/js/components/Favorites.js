import React from 'react';
import axios from 'axios';

class Favorites extends React.Component{

    constructor()
    {
        super();
        this.state = {
            memos:[],
            success:null,

        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:8000/api/memo/getFavorites").then(
            response => {
                console.log(response);
                this.setState({memos:response.data.memos,success:response.data.success});
            }
        );
    }

    render()
    {
        return (
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-8">
        
                {
                    this.state.success===null?<h1>Loading...</h1>:
                    this.state.success === false?
                    <h1>{this.state.memos}</h1>:
                    this.state.memos.map(
                        memo => {
                            return (
                                <div className="card text-center margin-bottom" key={memo.id}>
                                        <div className="card-header background--pink">
                                            <div className="row"> 
                                                <div className="col-6">
                                                <h5><i><b>{memo.title}</b></i></h5>
                                                </div>
                                            </div>
                                        
                                        </div>
                                        <div className="card-body">
                                            
                                            <p className="card-text">{memo.text}</p>
                                            
                                        </div>
                                        <div className="card-footer text-muted">
                                            <div className="row">
                                                <div className="col-12 text-center">
                                                {memo.created_at}
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                </div>

                            )
                        }
                    )
                    
            
                }
            
            </div>
            </div>
            </div>
        
        );
    }


}

export default Favorites;