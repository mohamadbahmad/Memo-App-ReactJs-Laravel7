import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Memos from './Memos';
import Add from './Add';
import Edit from './Edit';
import Favorites from "./Favorites";
import Error404 from "./Error404";
class App extends React.Component
{

    render()
    {
        return (
            <Router>
            <div className="container margin">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-4">
                                <h3>Memo App </h3>
                            </div>
                            <div className="col-8 text-right">
                              <Link to="/" className="text--blueviolet"><i className="fa fa-pencil"></i> My Memos</Link> |
                              <Link to="/favorites" className="text--red"> <i className="fa fa-heart"></i> My Favorites</Link> |
                              <Link to="/add" className="text-danger">	<i className="fa fa-plus-circle"></i> Add Memo</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                <Switch>
                    <Route path="/" exact>
                        <Memos />
                    </Route>
                    <Route path="/favorites" exact>
                        <Favorites />
                    </Route>
                    <Route path="/add" exact>
                        <Add />
                    </Route>
                    <Route path='/edit/:id' exact component={Edit} />

                    <Route path='/*' exact >
                        <Error404 />
                    </Route>
                    </Switch>
                       


                    </div>

                    <div className="card-footer text-center text--blueviolet">
                         <h5>© 2021. Made with <span className="text--red">❤</span> and React Js.<br /><i>By Mohamad Bahmad</i></h5>
                    </div>

                    </div>
                    </div>
        
                    </div>
            </div>

            </Router>
            
        );
    }

   

}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}