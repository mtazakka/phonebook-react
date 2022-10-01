import React, { Component } from 'react'

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.add(this.state.name, this.state.phone)
        this.setState({
            name: "",
            phone: ""
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input name='name' type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phonenumber</label>
                        <div className="col-sm-10">
                            <input name="phone" type="number" className="form-control" id="phone" value={this.state.phone} onChange={this.handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        );
    }
}