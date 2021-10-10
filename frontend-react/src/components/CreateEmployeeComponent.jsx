import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Step 02 for using Create component to Update the database
            id: this.props.match.params.id,
            firstName: '', 
            lastName: '', 
            email: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }
     // Step 03 for using Create component to Update the database
    componentDidMount(){
        // Step 04
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({ firstName: employee.firstName, 
                    lastName: employee.lastName, 
                    email: employee.email
                });
            });
        }
        
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
        console.log('employee => ' + JSON.stringify(employee));
        // Step 05
        if(this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
        
    }

    cancel() {
        this.props.history.push('/employees');
    }

    changeFirstNameHandler(event) {
        this.setState({ firstName: event.target.value });
    }
    changeLastNameHandler(event) {
        this.setState({ lastName: event.target.value });
    }
    changeEmailHandler(event) {
        this.setState({ email: event.target.value });
    }

    getTitle(){
        if(this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div>
                <section id="add-employee-section">
                    <div className="container">
                        <div className="row">
                            <div className="card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className="card-body">
                                    <form action="">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input placeholder="First Name" name="firstName" className="form-control" value={ this.state.firstName } onChange={ this.changeFirstNameHandler }/>
                                            <label>Last Name</label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" value={ this.state.lastName } onChange={ this.changeLastNameHandler }/>
                                            <label>Email</label>
                                            <input placeholder="Email" name="email" className="form-control" value={ this.state.email } onChange={ this.changeEmailHandler }/>
                                        </div>
                                        <button className="btn btn-success" onClick={ this.saveOrUpdateEmployee }>Save</button>
                                        <button className="btn btn-danger" onClick={ this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default CreateEmployeeComponent;