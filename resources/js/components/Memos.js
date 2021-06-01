import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios"
class Memos extends React.Component{

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
        axios.get("http://localhost:8000/api/memo/all").then(
            response => {
                console.log(response);
                this.setState({memos:response.data.memos,success:response.data.success});
            }
        );
    }
    onUpdatefavorite(id)
    {
        axios.post("http://localhost:8000/api/memo/changeFavorite/"+id).then(
            response => {
                console.log(response);
                var newMemos = [];
                var memos = this.state.memos;
                for(var i = 0;i<memos.length;i++)
                    {
                        if(memos[i].id == id)
                            {
                                newMemos.push(response.data.memo); 
                            }
                            else{
                                newMemos.push(memos[i]);  
                            }
                    }

                    console.log(newMemos);
                    this.setState({
                        memos:newMemos
                    })
                
                
            }
        )
    }
    onDeleteMemo(id)
    {
        axios.delete("http://localhost:8000/api/memo/delete/"+id).then(
        response => {
            if(response.data.success ===true)
            {
                var memos = this.state.memos;
                var suc = true;
                for(var i=0;i<memos.length;i++)
                    {
                        if(memos[i].id == id)
                            {
                                memos.splice(i,1);
                                if(memos.length === 0)
                                {
                                    suc=false;
                                    memos = "No memos";
                                }
                                
                            this.setState({
                                memos:memos,
                                success:suc
                            });
                            }
                    }
                
               
            }
        }
        )
        
    }

    render(){
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
                                                <div className="col-6">
                                                    <Link to={`/edit/${memo.id}`} className="btn btn-success rounded-pill"><i className="fa fa-edit"></i></Link>
                                                    &nbsp;<button type="button" className="btn btn-warning rounded-pill" onClick={this.onDeleteMemo.bind(this,memo.id)}><i className="fa fa-trash"></i></button>
                                                </div>
                                            </div>
                                        
                                        </div>
                                        <div className="card-body">
                                            
                                            <p className="card-text">{memo.text}</p>
                                            
                                        </div>
                                        <div className="card-footer text-muted">
                                            <div className="row">
                                                <div className="col-6">
                                                {memo.created_at}
                                                </div>
                                                <div className="col-6">
                                                    <button type="button" className={memo.isFavorite==1?"btn btn-danger":"btn btn-secondary"}  onClick={this.onUpdatefavorite.bind(this,memo.id)}>{memo.isFavorite==1?"Remove from favorite":"Add to favorite"}</button>
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

export default Memos;
