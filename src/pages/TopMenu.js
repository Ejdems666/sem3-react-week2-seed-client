import React, {Component} from 'react'
import {Link} from "react-router-dom";
import auth from '../authorization/auth'

class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {loggedIn: auth.loggedIn, userName: auth.userName, isUser: false, isAdmin: false}
    }

    loginStatus = (status, userName, isUser, isAdmin) => {
        this.setState({loggedIn: status, userName, isUser, isAdmin});
    }

    componentDidMount() {
        auth.setLoginObserver(this.loginStatus);
    }

    render() {
        const logInStatus = this.state.loggedIn ? "Logged in as: " + this.state.userName : "";

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/" style={{pointerEvents: "none"}}>Semester Seed</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/about">About</Link></li>
                        </ul>
                        <CurrentUserMenu isAdmin={this.state.isAdmin} isUser={this.state.isUser}/>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="navbar-text" style={{color: "steelBlue"}}>{logInStatus}</li>
                            <li>
                                {this.state.loggedIn ?
                                    (
                                        <Link to="/logout"><span className="glyphicon glyphicon-log-in"></span>
                                            Logout</Link>
                                    ) :
                                    (
                                        <Link to="/login">
                                            <span className="glyphicon glyphicon-log-out"></span> Login </Link>
                                    )}
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        )
    }
}

function CurrentUserMenu(props) {
    if (props.isUser && props.isAdmin) {
        return (
            <ul className="nav navbar-nav">
                <li><Link to="/user">Page for Users </Link></li>
                <li><Link to="/random-number">RandomNumber</Link></li>
                <li><Link to="/admin">Page for Admins</Link></li>
                <li><Link to="/all-users">All Users</Link></li>
            </ul>
        )
    } else if (props.isUser) {
        return (
            <ul className="nav navbar-nav">
                <li><Link to="/user">Page for Users </Link></li>
                <li><Link to="/random-number">RandomNumber</Link></li>
            </ul>
        )
    } else if (props.isAdmin) {
        return (
            <ul className="nav navbar-nav">
                <li><Link to="/admin">Page for Admins</Link></li>
                <li><Link to="/all-users">All Users</Link></li>
            </ul>
        )
    }
    return ''
}

export default TopMenu;
