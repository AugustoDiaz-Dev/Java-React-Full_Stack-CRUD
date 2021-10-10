import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';


class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        })
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <main>
                    <h2 className="text-center"> Employees List</h2>
                    <div className="row">
                        <div className="col">
                        <button id="add-employee"className="btn btn-primary" onClick={ this.addEmployee }>Add Employee</button>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = { employee.id }>
                                            <td> { employee.firstName }</td>
                                            <td> { employee.lastName }</td>
                                            <td> { employee.email }</td>
                                            <td>
                                                <button onClick= { () => this.editEmployee(employee.id)} className="btn btn-warning my-action-btn">Update</button>
                                                <button onClick= { () => this.deleteEmployee(employee.id)} className="btn btn-danger my-action-btn">Delete</button>
                                                <button onClick= { () => this.viewEmployee(employee.id)} className="btn btn-success my-action-btn">View</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </main>
                
            </div>
        )
    }
}

export default ListEmployeeComponent;
