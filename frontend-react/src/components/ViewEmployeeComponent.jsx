import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            id: this.props.match.params.id,
            employee: {}

        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        });
    }

    render() {
        return (
            <div>
                <section id="view-employee-section">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">Employee Details</h3>
                        <div className="card-body">

                            <div className="row">
                                <label className="my-label">Employee First Name: </label>
                                <div>{ this.state.employee.firstName }</div>
                            </div>
                            <hr />
                            <div className="row">
                                <label className="my-label">Employee Last Name: </label>
                                <div>{ this.state.employee.lastName }</div>
                            </div>
                            <hr />
                            <div className="row">
                                <label className="my-label">Employee Email: </label>
                                <div>{ this.state.employee.email }</div>
                            </div>

                        </div>
                    </div>
                </section>
               
            </div>
        )
    }
}
export default ViewEmployeeComponent;