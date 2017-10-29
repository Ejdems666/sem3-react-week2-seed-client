import React, { Component } from 'react'
import adminData from "../facades/adminFacade";

class AllUsers extends Component {

    constructor() {
        super();
        this.state = { data: [], err: "" }
    }

    componentWillMount() {
        /*
        This will fetch data each time you navigate to this route
        If only required once, add "logic" to determine when data should be "refetched"
        */
        adminData.fetchResources("api/all-users",(e, data) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", data: data });
        });
    }

    render() {
        return (
            <div>
                <h2>All Users</h2>
                <p>These users are fetched from the server if you were properly logged in</p>
                <div className="msgFromServer">
                    <ul>
                    {this.state.data.map(function(user,index){
                        return <li key={index}>Name: {user.userName} Roles: {user.roles.map((role) => {return role.roleName}).join(",")}</li>;
                    })}
                    </ul>
                </div>
                {this.state.err && (
                    <div className="alert alert-danger errmsg-left" role="alert">
                        {this.state.err}
                    </div>
                )}
            </div>
        )
    }
}

export default AllUsers;