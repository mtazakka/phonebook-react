import React, { Component } from 'react'

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.add(this.state.value)
    console.log('cobaaaa', this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="name" value={this.state.value} onChange={this.handleChange} required />
          </div>
        </div>
        {/* <div className="row mb-3">
          <label htmlFor="phone" className="col-sm-2 col-form-label">Phonenumber</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="phone" value={this.state.value} onChange={this.handleChange} required />
          </div>
        </div> */}
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}