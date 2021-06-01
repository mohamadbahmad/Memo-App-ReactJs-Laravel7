import React from 'react';
import axios from 'axios';
import Successmessage from './Successmessage';
import Errormessage from './Errormessage';

class Edit extends React.Component{

    constructor(props)
    {
        super(props);
     
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            title:'',
            text:'',
            success:'',
            message:'',
            isDataAvailable:null,
            
        }

    }
    componentDidMount()
    {
        axios.get('http://localhost:8000/api/memo/get/'+this.props.match.params.id).then(
            response => {
                console.log(response);
                if(response.data.success === false)
                    {
                        this.setState({
                            isDataAvailable:response.data.success,
                            title:'',
                            text:''
                        });
                    }
                this.setState({
                isDataAvailable:response.data.success,
                title:response.data.memo.title,
                text:response.data.memo.text,
            });
            }
        );
    }


    onChangeTitle(e)
    {
        this.setState({
            title:e.target.value
        });
    }
    onChangeText(e)
    {
        this.setState({
            text:e.target.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();
        const memo = {
            title:this.state.title,
            text:this.state.text
        }
        axios.post("http://localhost:8000/api/memo/update/"+this.props.match.params.id,memo).then(
            response => {
                this.setState(
                    {

                        success:response.data.success,
                        message:response.data.message
                    }
                );
                console.log(response);
            }
        )
    }

    render(){
        return (
            

            <div className="container">
                
                {this.state.success ===true?<Successmessage  message={this.state.message} />:null}
                {this.state.success ===false?<Errormessage  message={this.state.message} />:null}

                {this.state.isDataAvailable==null?<h3>Loading...</h3>:
                this.state.isDataAvailable==true?
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle} id="title" placeholder="Type a title here..." required/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <textarea className="form-control" id="text" onChange={this.onChangeText}
                    placeholder="Type a text here..." required value={this.state.text}>
                        
                    </textarea>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>:<h1>You are smart!but not here</h1>}
            </div>
        );
    }

}

export default Edit;
