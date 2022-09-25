import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.add(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-2 col-form-label">Kerjaan</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="title" value={this.state.value} onChange={this.handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Tambah</button>
      </form>
    );
  }
}