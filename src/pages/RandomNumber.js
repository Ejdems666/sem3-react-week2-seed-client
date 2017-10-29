import React, {Component} from 'react'
import userData from "../facades/userFacade";

class RandomNumber extends Component {

    constructor() {
        super();
        this.state = {data: "", err: ""}
    }

    componentWillMount() {
        userData.fetchResources("api/random-number",(e, data) => {
            if (e) {
                return this.setState({err: e.err})
            }
            this.setState({err: "", data});
        });
    }

    render() {
        return (
            <div>
                <h2>Random number</h2>
                <p>This random number fetched from the server if you are properly logged in</p>

                <div className="msgFromServer">
                    {this.state.data}
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

export default RandomNumber;